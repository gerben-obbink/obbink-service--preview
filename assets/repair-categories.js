(() => {
  // These keys extend the repair page's existing data-repair-i18n dictionary.
  const content = {
    de: {
      title: 'SERVICE FÜR FAST ALLES MIT EINEM STECKER',
      intro: 'Obbink Service repariert, wartet und untersucht ein breites Sortiment elektrischer Geräte und Elektronik. Von Staubsaugern und Kaffeevollautomaten bis zu Fernsehern, Audioanlagen, Computern, Laptops, Haushaltsgroßgeräten und Einbaugeräten. Unsere eigene technische Organisation untersucht die Störung, beurteilt die Reparaturmöglichkeiten und prüft, ob eine Reparatur technisch und wirtschaftlich sinnvoll ist.',
      hint: 'Wählen Sie unten Ihre Gerätekategorie für weitere Informationen zu unseren Reparatur- und Servicemöglichkeiten.',
      contactTitle: 'Ihr Gerät ist nicht dabei?',
      contactBody: 'Unser technischer Service geht über diese sechs Kategorien hinaus. Kontaktieren Sie uns und senden Sie nach Möglichkeit Marke, Modell und eine kurze Beschreibung der Störung mit.',
      contactCta: 'Fragen Sie uns', label: 'REPARATUR & SERVICE', cta: 'Reparatur anfragen', homeCta: 'Service vor Ort anfragen', close: 'Schließen',
      categories: [
        ['Kaffeemaschinen & Kaffeevollautomaten', 'Ein Kaffeevollautomat oder eine Espressomaschine enthält Technik, die regelmäßige Wartung und eine fachkundige Diagnose erfordert. Obbink Service untersucht Störungen und beurteilt, welche Reparatur technisch und wirtschaftlich sinnvoll ist.', ['Kaffeevollautomaten und Bohnenkaffeemaschinen', 'Espresso- und Kaffeemaschinen', 'Störungen, Wartung und technische Diagnose', 'Beurteilung von Ersatzteilen und Reparaturmöglichkeiten']],
        ['Staubsauger & Dampfreiniger', 'Funktioniert Ihr Staubsauger oder Dampfreiniger nicht mehr richtig, macht das Gerät ungewöhnliche Geräusche oder hat die Leistung nachgelassen? Obbink Service untersucht die Störung und prüft, ob eine Reparatur möglich und sinnvoll ist.', ['Boden- und Stielstaubsauger', 'Dampfreiniger', 'Störungen und technische Diagnose', 'Ersatzteile und Reparaturmöglichkeiten']],
        ['Haushaltskleingeräte', 'Auch bei verschiedenen elektrischen Haushaltsgeräten hilft Ihnen Obbink Service. Wir untersuchen zunächst den Defekt und beurteilen, ob eine Reparatur technisch und wirtschaftlich sinnvoll ist.', ['Küchen- und Haushaltsgeräte', 'Elektrische Kleingeräte', 'Diagnose technischer Störungen', 'Reparatur oder Austausch beurteilen']],
        ['TV, Audio & Elektronik', 'Bei Elektronik beginnt guter Service mit einer klaren Diagnose. Obbink Service untersucht Störungen und beurteilt, welche Reparatur oder welcher technische Folgeschritt geeignet ist.', ['Fernseher', 'Soundbars und Lautsprecher', 'Receiver und Audiosysteme', 'Weitere Unterhaltungselektronik', 'Diagnose und technischer Service']],
        ['Computer & Laptops', 'Bei Computern und Laptops untersuchen wir Hardwareprobleme, defekte Bauteile und andere technische Störungen. Zunächst stellen wir fest, was vorliegt und welche Reparatur sinnvoll ist.', ['Laptops und Desktop-Computer', 'Hardwarediagnose', 'Stromversorgung, Speicher und Anschlüsse', 'Austausch oder Reparatur von Bauteilen']],
        ['Haushaltsgroßgeräte & Einbaugeräte', 'Für Haushaltsgroßgeräte und Einbaugeräte kommt Obbink Service zu Ihnen nach Hause. Unser Techniker stellt die Diagnose vor Ort und beurteilt, ob eine Reparatur möglich und sinnvoll ist.', ['Waschmaschinen und Trockner', 'Geschirrspüler', 'Kühlschränke und Gefriergeräte', 'Backöfen, Kochfelder und weitere Einbaugeräte', 'Diagnose und Reparatur bei Ihnen zu Hause']]
      ]
    },
    en: {
      title: 'SERVICE FOR ALMOST EVERYTHING WITH A PLUG',
      intro: 'Obbink Service repairs, maintains and examines a broad range of electrical appliances and electronics. From vacuum cleaners and bean-to-cup coffee machines to televisions, audio equipment, computers, laptops, major household appliances and built-in appliances. Our own technical team investigates the fault, assesses the repair options and considers whether repair is technically and economically sensible.',
      hint: 'Choose your appliance category below for more information about our repair and service options.',
      contactTitle: 'Cannot find your appliance?',
      contactBody: 'Our technical service covers more than these six categories. Contact us and, if possible, include the brand, model and a short description of the fault.',
      contactCta: 'Ask us', label: 'REPAIR & SERVICE', cta: 'Request a repair', homeCta: 'Request a home service visit', close: 'Close',
      categories: [
        ['Coffee & bean-to-cup machines', 'A bean-to-cup coffee machine, fully automatic coffee machine or espresso machine contains technology that needs regular maintenance and expert diagnosis. Obbink Service investigates faults and assesses which repairs are technically and economically sensible.', ['Fully automatic and bean-to-cup coffee machines', 'Espresso and coffee machines', 'Faults, maintenance and technical diagnosis', 'Assessment of parts and repair options']],
        ['Vacuum cleaners & steam cleaners', 'Is your vacuum cleaner or steam cleaner no longer working properly, making unusual noises or performing less effectively? Obbink Service investigates the fault and checks whether repair is possible and worthwhile.', ['Cylinder and stick vacuum cleaners', 'Steam cleaners', 'Faults and technical diagnosis', 'Parts and repair options']],
        ['Small household appliances', 'Obbink Service can also help with various electrical household appliances. We first investigate the fault and assess whether repair is technically and economically sensible.', ['Kitchen and household appliances', 'Small electrical appliances', 'Diagnosis of technical faults', 'Assessing repair or replacement']],
        ['TV, audio & electronics', 'For electronics, good service starts with a clear diagnosis. Obbink Service investigates faults and assesses which repair or technical next step is appropriate.', ['Televisions', 'Soundbars and speakers', 'Receivers and audio systems', 'Other consumer electronics', 'Diagnosis and technical service']],
        ['Computers & laptops', 'For computers and laptops, we investigate hardware problems, defective components and other technical faults. We first establish what is wrong and which repair makes sense.', ['Laptops and desktops', 'Hardware diagnosis', 'Power supplies, storage and connections', 'Replacement or repair of components']],
        ['Major household & built-in appliances', 'For major household appliances and built-in appliances, Obbink Service comes to your home. Our technician diagnoses the fault on site and assesses whether repair is possible and sensible.', ['Washing machines and dryers', 'Dishwashers', 'Refrigerators and freezers', 'Ovens, hobs and other built-in appliances', 'Diagnosis and repair at home']]
      ]
    },
    fr: {
      title: 'UN SERVICE POUR PRESQUE TOUT CE QUI SE BRANCHE',
      intro: 'Obbink Service répare, entretient et examine une large gamme d’appareils électriques et électroniques. Des aspirateurs et machines à café à grains aux téléviseurs, équipements audio, ordinateurs, ordinateurs portables, gros électroménagers et appareils encastrables. Notre propre organisation technique examine la panne, évalue les possibilités de réparation et vérifie si celle-ci est techniquement et économiquement justifiée.',
      hint: 'Choisissez ci-dessous la catégorie de votre appareil pour en savoir plus sur nos possibilités de réparation et de service.',
      contactTitle: 'Votre appareil ne figure pas dans la liste ?',
      contactBody: 'Notre service technique couvre davantage que ces six catégories. Contactez-nous en précisant, si possible, la marque, le modèle et une brève description de la panne.',
      contactCta: 'Posez-nous la question', label: 'RÉPARATION & SERVICE', cta: 'Demander une réparation', homeCta: 'Demander une intervention à domicile', close: 'Fermer',
      categories: [
        ['Machines à café & à grains', 'Une machine à café à grains, un expresso broyeur ou une machine à espresso contient une technologie qui nécessite un entretien régulier et un diagnostic expert. Obbink Service examine les pannes et évalue quelle réparation est techniquement et économiquement justifiée.', ['Machines à café automatiques et à grains', 'Machines à espresso et à café', 'Pannes, entretien et diagnostic technique', 'Évaluation des pièces et des possibilités de réparation']],
        ['Aspirateurs & nettoyeurs vapeur', 'Votre aspirateur ou nettoyeur vapeur ne fonctionne plus correctement, fait des bruits inhabituels ou a perdu en efficacité ? Obbink Service examine la panne et vérifie si une réparation est possible et pertinente.', ['Aspirateurs traîneaux et balais', 'Nettoyeurs vapeur', 'Pannes et diagnostic technique', 'Pièces et possibilités de réparation']],
        ['Petit électroménager', 'Obbink Service prend également en charge divers appareils électroménagers électriques. Nous examinons d’abord le défaut et évaluons si une réparation est techniquement et économiquement justifiée.', ['Appareils de cuisine et électroménagers', 'Petits appareils électriques', 'Diagnostic des pannes techniques', 'Évaluation de la réparation ou du remplacement']],
        ['TV, audio & électronique', 'Pour l’électronique, un bon service commence par un diagnostic clair. Obbink Service examine les pannes et évalue la réparation ou la prochaine étape technique appropriée.', ['Téléviseurs', 'Barres de son et enceintes', 'Amplificateurs et systèmes audio', 'Autres appareils électroniques grand public', 'Diagnostic et service technique']],
        ['Ordinateurs & portables', 'Pour les ordinateurs et portables, nous examinons les problèmes matériels, les composants défectueux et les autres pannes techniques. Nous déterminons d’abord la cause et la réparation pertinente.', ['Ordinateurs portables et de bureau', 'Diagnostic matériel', 'Alimentation, stockage et connexions', 'Remplacement ou réparation de composants']],
        ['Gros électroménager & encastrable', 'Pour le gros électroménager et les appareils encastrables, Obbink Service intervient chez vous. Notre technicien établit le diagnostic sur place et évalue si une réparation est possible et justifiée.', ['Lave-linge et sèche-linge', 'Lave-vaisselle', 'Réfrigérateurs et congélateurs', 'Fours, plaques de cuisson et autres appareils encastrables', 'Diagnostic et réparation à domicile']]
      ]
    },
    zh: {
      title: '几乎所有插电设备，我们都能提供服务',
      intro: 'Obbink Service为种类广泛的电器及电子设备提供维修、保养和检测服务，包括吸尘器、全自动咖啡机、电视、音响、电脑、笔记本电脑、大家电及嵌入式电器。我们自有的技术团队检查故障，评估维修方案，并判断维修在技术和经济上是否合理。',
      hint: '请选择下方的设备类别，了解我们的维修及服务方案。',
      contactTitle: '没有找到您的设备？',
      contactBody: '我们的技术服务不限于这六类设备。请联系我们，并尽可能提供品牌、型号和简短的故障说明。',
      contactCta: '向我们咨询', label: '维修与服务', cta: '申请维修', homeCta: '申请上门服务', close: '关闭',
      categories: [
        ['咖啡机与全自动咖啡机', '全自动咖啡机和意式咖啡机包含需要定期保养和专业检测的技术部件。Obbink Service检查故障，并评估哪种维修方案在技术和经济上合理。', ['全自动咖啡机及咖啡豆研磨咖啡机', '意式咖啡机及普通咖啡机', '故障、保养及技术诊断', '零部件和维修方案评估']],
        ['吸尘器与蒸汽清洁机', '您的吸尘器或蒸汽清洁机是否工作异常、出现异响或性能下降？Obbink Service检查故障，并判断维修是否可行且值得。', ['卧式及杆式吸尘器', '蒸汽清洁机', '故障及技术诊断', '零部件及维修方案']],
        ['小型家用电器', 'Obbink Service也为多种家用电器提供服务。我们首先检查故障，并判断维修在技术和经济上是否合理。', ['厨房及家用电器', '小型电器', '技术故障诊断', '评估维修还是更换']],
        ['电视、音响与电子设备', '电子设备的优质服务始于明确的诊断。Obbink Service检查故障，并评估合适的维修方案或后续技术步骤。', ['电视机', '回音壁及音箱', '功放及音响系统', '其他消费电子设备', '诊断及技术服务']],
        ['电脑与笔记本电脑', '针对电脑和笔记本电脑，我们检查硬件问题、损坏部件及其他技术故障。我们先确定问题所在，再判断哪种维修方式合理。', ['笔记本电脑及台式电脑', '硬件诊断', '电源、存储及接口', '零部件更换或维修']],
        ['大家电与嵌入式电器', '对于大家电和嵌入式电器，Obbink Service提供上门服务。我们的技师在现场进行诊断，并评估维修是否可行且合理。', ['洗衣机及烘干机', '洗碗机', '冰箱及冰柜', '烤箱、灶具及其他嵌入式电器', '上门诊断及维修']]
      ]
    }
  };
  window.REPAIR_CATEGORY_TRANSLATIONS = Object.fromEntries(Object.entries(content).map(([language, value]) => {
    const dictionary = {};
    for (const key of ['title', 'intro', 'hint', 'contactTitle', 'contactBody', 'contactCta', 'label']) {
      dictionary[`chooser.${key}`] = value[key];
    }
    value.categories.forEach(([title, body, bullets], index) => {
      dictionary[`chooser.${index}.title`] = title;
      dictionary[`chooser.${index}.body`] = body;
      dictionary[`chooser.${index}.cta`] = index === 5 ? value.homeCta : value.cta;
      bullets.forEach((bullet, item) => { dictionary[`chooser.${index}.bullet${item}`] = bullet; });
    });
    return [language, dictionary];
  }));

  const language = new URLSearchParams(location.search).get('lang') || localStorage.getItem('obbink-language') || 'nl';
  document.querySelectorAll('[data-repair-dialog]').forEach((button) => {
    const dialog = document.getElementById(button.dataset.repairDialog);
    const close = dialog.querySelector('[data-repair-close]');
    close.setAttribute('aria-label', content[language]?.close || 'Sluiten');
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('repair-dialog-open');
      button.setAttribute('aria-expanded', 'true');
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      document.body.classList.remove('repair-dialog-open');
      button.setAttribute('aria-expanded', 'false');
      button.focus({ preventScroll: true });
    });
    // Native dialog supplies focus containment, background inertness and Escape.
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    let startedOutside = false;
    dialog.addEventListener('pointerdown', (event) => { startedOutside = event.target === dialog && outside(event); });
    dialog.addEventListener('click', (event) => {
      if (startedOutside && event.target === dialog && outside(event)) dialog.close();
      startedOutside = false;
    });
  });
})();
