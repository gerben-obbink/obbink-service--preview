(() => {
  function initialise() {
    const c = window.obbinkDamageCopy;
    if (!c || !document.querySelector('#wertgarantie')) return;
    document.querySelectorAll('[data-damage]').forEach(el => { el.textContent = c[el.dataset.damage]; });
    document.querySelectorAll('[data-damage-alt]').forEach(el => { el.alt = c[el.dataset.damageAlt]; });
    const make = (tag, text, className) => {
      const el = document.createElement(tag); if (text) el.textContent = text;
      if (className) el.className = className; return el;
    };
    const specs = [
      [['device','select',true,['washer','dryer','dishwasher','fridge','coffee','vacuum','audio','computer','small','other']],['brand','text',true],['model','text'],['serial','text'],['purchased','date'],['shop','text']],
      [['issue','select',true,['notWorking','technical','damage','impact','water','other']],['problem','textarea',true],['code','text'],['started','date'],['photoDevice','file'],['photoPlate','file'],['photoExtra','file']],
      [['warranty','select',true,['yes','no','unknown']],['policy','select',true,['wertgarantie','otherPolicy','no','unknown']],['contract','text'],['receipt','select',false,['yes','no']],['repairReceipt','select',false,['yes','no','na']]],
      [['first','text',true],['last','text',true],['street','text',true],['house','text',true],['postal','text',true],['city','text',true],['phone','tel',true],['email','email',true],['preference','select',true,['callMe','emailMe']]]
    ];
    const titles = ['device','issue','warranty','contact','summary'];
    const all = specs.flat(); const fields = {}, errors = {};
    let step = 0, opener, pending = false, submitted = false, uncertain = false;
    const dialog = make('dialog', '', 'damage-dialog'); dialog.id = 'damage-report';
    dialog.setAttribute('aria-labelledby','damage-title'); dialog.setAttribute('aria-describedby','damage-subtitle');
    const head = make('div','','damage-head'), heading = make('div');
    const title = make('h2',c.title); title.id = 'damage-title';
    const subtitle = make('p',c.subtitle); subtitle.id = 'damage-subtitle';
    heading.append(title,subtitle);
    const close = make('button','×','damage-close'); close.type='button';close.setAttribute('aria-label',c.close);
    close.onclick=()=>dialog.close();head.append(heading,close);dialog.append(head);
    const form = make('form');form.noValidate=true;
    const progress=make('p','','damage-progress');progress.setAttribute('aria-live','polite');
    const stepTitle=make('h3');stepTitle.tabIndex=-1;
    form.append(progress,stepTitle);
    const panels=[];
    const fileControls=[];
    const conditional = new Set(['contract','receipt','repairReceipt']);
    function syncPolicy() {
      for (const key of conditional) { fields[key].disabled=fields.policy.value!=='wertgarantie'; fields[key].closest('.damage-field').hidden=fields[key].disabled; }
    }
    specs.forEach((list,index)=>{
      const panel=make('div','','damage-grid');panels.push(panel);form.append(panel);
      list.forEach(([key,type,required,options])=>{
        const wrap=make('div','','damage-field'+(['textarea','file'].includes(type)?' wide':''));
        const label=make('label',c[key]+(required?' *':' — '+c.optional));label.htmlFor='damage-'+key;label.id='damage-label-'+key;
        const input=make(type==='select'?'select':type==='textarea'?'textarea':'input');input.id='damage-'+key;input.name=key;
        if(!['select','textarea'].includes(type))input.type=type;
        input.required=!!required;input.maxLength=type==='textarea'?3000:80;
        if(type==='date') input.max=new Date().toLocaleDateString('en-CA');
        const autocomplete={first:'given-name',last:'family-name',street:'address-line1',postal:'postal-code',city:'address-level2',phone:'tel',email:'email'};
        if(autocomplete[key])input.autocomplete=autocomplete[key];
        if(options){const placeholder=make('option',c.choose);placeholder.value='';input.append(placeholder);options.forEach(o=>{const option=make('option',c[o]);option.value=o;input.append(option);});}
        const error=make('span','','damage-error');error.id='damage-error-'+key;error.hidden=true;input.setAttribute('aria-describedby',error.id);
        fields[key]=input;errors[key]=error;wrap.append(label,input);
        if(type==='file'){
          input.accept='.jpg,.jpeg,.png,.webp';input.required=false;
          const pick=make('button',c.pickFile,'button button-secondary');pick.type='button';pick.setAttribute('aria-labelledby',label.id);pick.onclick=()=>input.click();
          const name=make('span',c.noFile,'damage-file-name');name.setAttribute('aria-live','polite');
          const remove=make('button',c.removeFile,'button button-secondary');remove.type='button';remove.hidden=true;
          const update=()=>{name.textContent=input.files[0]?.name||c.noFile;remove.hidden=!input.files.length;};
          input.addEventListener('change',update);remove.onclick=()=>{input.value='';update();};
          pick.setAttribute('aria-describedby',error.id+' damage-upload-help');wrap.append(pick,name,remove);fileControls.push({key,pick});
        }
        input.addEventListener('input',()=>{error.hidden=true;input.removeAttribute('aria-invalid');});
        wrap.append(error);panel.append(wrap);
      });
      if(index===1){const help=make('p',c.uploadHelp,'damage-field wide');help.id='damage-upload-help';panel.append(help);}
      if(index===2){const note=make('p',c.policyNote,'damage-field wide damage-note');panel.append(note);}
    });
    fields.policy.addEventListener('change',syncPolicy);syncPolicy();
    const summary=make('dl','','damage-summary');panels.push(summary);form.append(summary);
    const notice=make('div','','damage-note');notice.hidden=true;notice.tabIndex=-1;notice.setAttribute('role','status');form.append(notice);
    const actions=make('div','','damage-actions');const back=make('button',c.back,'button button-secondary');back.type='button';
    const next=make('button',c.next,'button');next.type='submit';actions.append(back,next);form.append(actions);dialog.append(form);document.body.append(dialog);
    function show() {
      panels.forEach((p,i)=>p.hidden=i!==step);
      progress.textContent=c.step+' '+(step+1)+' '+c.of+' 5';stepTitle.textContent=c[titles[step]];
      back.hidden=step===0;back.textContent=step===4?c.edit:c.back;
      next.textContent=step===4?c.submit:c.next;next.disabled=pending||submitted||uncertain;
      notice.hidden=true;dialog.scrollTop=0;stepTitle.focus();
    }
    function textValue(key) {
      const field=fields[key];return field.tagName==='SELECT'?(c[field.value]||c.notGiven):(field.type==='file'?(field.files[0]?.name||c.notGiven):field.value.trim()||c.notGiven);
    }
    function review() {
      summary.replaceChildren();
      all.forEach(([key])=>{if(fields[key].disabled)return;summary.append(make('dt',c[key]),make('dd',textValue(key)));});
    }
    function validate(index) {
      let first;
      specs[index].forEach(([key,type])=>{
        const field=fields[key];let invalid=!field.disabled&&(!field.checkValidity()||(field.required&&!field.value.trim()));
        if(type==='file')invalid=[...field.files].some(f=>!(/\.(jpe?g|png|webp)$/i.test(f.name)));
        errors[key].textContent=type==='file'?c.uploadError:c.required;errors[key].hidden=!invalid;field.setAttribute('aria-invalid',String(invalid));
        if(invalid&&!first)first=type==='file'?fileControls.find(x=>x.key===key).pick:field;
      });
      if(index===1&&files().reduce((size,file)=>size+file.size,0)>2*1024*1024){errors.photoDevice.textContent=c.uploadError;errors.photoDevice.hidden=false;first||=fileControls[0].pick;}
      if(first){notice.textContent=c.validation;notice.hidden=false;first.focus();return false;}return true;
    }
    function files(){return fileControls.flatMap(({key})=>[...fields[key].files]);}
    function message(text) {notice.textContent=text;notice.hidden=false;notice.focus();}
    back.onclick=()=>{if(pending||submitted)return;step=step===4?0:Math.max(0,step-1);show();};
    // Keep the existing RegularServiceRequest contract. Additional claim context is
    // included in Problem, not silently dropped as unknown API fields. Recipient is
    // configured server-side by ServiceRequestMail (receptie@obbink.nl).
    function payload() {
      const data=new FormData();
      const values={name:fields.first.value.trim()+' '+fields.last.value.trim(),street:fields.street.value.trim(),house_number:fields.house.value.trim(),postal_code:fields.postal.value.trim(),city:fields.city.value.trim(),phone:fields.phone.value.trim(),email:fields.email.value.trim(),request_type:'repair',brand:fields.brand.value.trim(),device:textValue('device'),model:fields.model.value.trim(),miele_serial:fields.serial.value.trim(),urgency:'normal',contact_preference:fields.preference.value==='emailMe'?'email':'phone'};
      const extra=['issue','problem','purchased','shop','code','started','warranty','policy',...(fields.policy.value==='wertgarantie'?['contract','receipt','repairReceipt']:[])];
      values.problem='SCHADEMELDING OBBINK SERVICE\n'+extra.map(key=>c[key]+': '+textValue(key)).join('\n');
      if(values.problem.length>5000)throw new Error('length');
      Object.entries(values).forEach(([key,value])=>data.append(key,value));
      fileControls.forEach(({key})=>{for(const file of fields[key].files)data.append('photo',file,key+'-'+file.name);});return data;
    }
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(pending||submitted||uncertain)return;
      if(step<4){if(!validate(step))return;step++;if(step===4)review();show();return;}
      for(let i=0;i<4;i++){if(!validate(i)){step=i;show();return;}}
      if(location.protocol==='file:'||/(^|\.)github\.io$/i.test(location.hostname)){message(c.notSent);return;}
      pending=true;next.disabled=true;back.disabled=true;next.textContent=c.sending;let attempted=false;
      try{
        const data=payload();
        const capabilities=await fetch('/api/service-requests/capabilities',{credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(8000)});
        if(!capabilities.ok||!capabilities.headers.get('content-type')?.includes('application/json')){message(c.notSent);return;}
        const capability=await capabilities.json();
        if(capability.available!==true||!capability.requestToken){message(c.notSent);return;}
        if(files().length>(capability.maxAttachments??3)||files().reduce((s,f)=>s+f.size,0)>(capability.maxAttachmentBytes??2*1024*1024)){message(c.uploadError);return;}
        attempted=true;
        const response=await fetch('/api/service-requests',{method:'POST',body:data,credentials:'same-origin',headers:{'X-CSRF-TOKEN':capability.requestToken},signal:AbortSignal.timeout(30000)});
        const result=response.headers.get('content-type')?.includes('application/json')?await response.json():{};
        if(response.status===202&&result.accepted===true){submitted=true;panels.forEach(p=>p.hidden=true);progress.hidden=true;stepTitle.textContent=c.received;message(c.thanks);actions.hidden=true;}
        else if(result.error==='invalid_attachment')message(c.uploadError);
        else if(result.error==='mail_unavailable')message(c.notSent);
        else if(result.error==='invalid_request')message(c.validation);
        else {uncertain=true;message(c.failed);}
      }catch(error){if(error.message==='length')message(c.limit);else{uncertain=attempted;message(attempted?c.failed:c.notSent);}}
      finally{pending=false;next.disabled=submitted||uncertain;back.disabled=false;next.textContent=c.submit;}
    });
    dialog.addEventListener('close',()=>{document.body.classList.remove('damage-open');opener?.focus();});
    dialog.addEventListener('keydown',event=>{
      if(event.key!=='Tab')return;
      const focusable=[...dialog.querySelectorAll('button,input,select,textarea,[tabindex="0"]')].filter(e=>!e.disabled&&e.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    });
    document.querySelectorAll('[data-damage-open]').forEach(button=>{
      button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls',dialog.id);
      button.addEventListener('click',()=>{opener=button;dialog.showModal();document.body.classList.add('damage-open');if(!submitted){show();if(uncertain)message(c.failed);}});
    });
  }
  if(window.obbinkDamageCopy)initialise();else window.addEventListener('load',initialise,{once:true});
})();
