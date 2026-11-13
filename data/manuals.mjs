export const languageMeta = {
  zh: { label: "简体中文", short: "ZH", locale: "zh-CN" },
  en: { label: "English", short: "EN", locale: "en-GB" },
  de: { label: "Deutsch", short: "DE", locale: "de-DE" },
  fr: { label: "Français", short: "FR", locale: "fr-FR" },
  es: { label: "Español", short: "ES", locale: "es-ES" },
  pt: { label: "Português", short: "PT", locale: "pt-PT" }
};

const H5_SECTIONS = {
  zh: [
    {
      id: "safety",
      title: "安全须知",
      body: [
        "安装、调试和维护必须由具备相应资质的人员完成。断开直流侧、交流侧和储能电池后，请等待至少 5 分钟，再打开设备外壳。",
        "请使用绝缘工具并佩戴个人防护装备。设备并网前，必须确认当地电网规范、接地方式和保护参数均符合要求。"
      ]
    },
    {
      id: "installation",
      title: "安装与接线",
      body: [
        "将设备安装在通风良好、无易燃物且便于观察显示屏的位置。机身周围应保留足够的散热和维护空间。",
        "按照端子标识连接 PV、电池、负载和电网。扭矩不足会导致发热，扭矩过大可能损坏端子。首次上电前请复核极性与绝缘。"
      ]
    },
    {
      id: "operation",
      title: "运行模式",
      body: [
        "H5 系列支持自发自用、削峰填谷、备用电源和并网馈电模式。模式切换可在调试界面中完成。",
        "在备用电源模式下，请确认关键负载不超过备用输出容量。出现电网异常时，系统会按预设保护策略切换。"
      ]
    },
    {
      id: "maintenance",
      title: "维护",
      body: [
        "每六个月检查一次散热风道、接线端子和告警记录。清洁前必须断电，禁止直接向设备内部喷水或使用腐蚀性清洁剂。",
        "长期停用前，请将电池电量保持在制造商建议范围内，并按电池说明书执行定期充电。"
      ]
    },
    {
      id: "troubleshooting",
      title: "故障排查",
      body: [
        "如设备显示绝缘故障，请检查直流线缆、接头和组件是否存在受潮或破损。未经确认，不得反复强制复位。",
        "无法清除的告警应记录故障代码、发生时间和现场条件，并联系授权服务人员。"
      ]
    }
  ],
  en: [
    {
      id: "safety",
      title: "Safety information",
      body: [
        "Installation, commissioning and maintenance must be performed by qualified personnel. After isolating the DC, AC and battery supplies, wait at least 5 minutes before opening the enclosure.",
        "Use insulated tools and personal protective equipment. Before grid connection, confirm that local grid requirements, earthing and protection settings are satisfied."
      ]
    },
    {
      id: "installation",
      title: "Installation and wiring",
      body: [
        "Install the unit in a well-ventilated location away from combustible materials, with the display easy to read. Keep sufficient clearance for cooling and service access.",
        "Connect PV, battery, backup load and grid cables according to the terminal labels. Under-torqued terminals can overheat, while excessive torque can damage them. Verify polarity and insulation before first power-up."
      ]
    },
    {
      id: "operation",
      title: "Operating modes",
      body: [
        "The H5 series supports self-consumption, peak shaving, backup supply and grid export modes. Modes can be changed from the commissioning interface.",
        "In backup mode, make sure critical loads remain within the backup output rating. During a grid fault, the system transfers according to its configured protection strategy."
      ]
    },
    {
      id: "maintenance",
      title: "Maintenance",
      body: [
        "Inspect the airflow path, terminals and alarm history every six months. Isolate the system before cleaning. Never spray water into the enclosure or use corrosive cleaners.",
        "Before extended shutdown, leave the battery within the manufacturer's recommended state of charge and follow the battery instructions for periodic recharge."
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      body: [
        "If an insulation fault is displayed, inspect DC cables, connectors and modules for moisture or damage. Do not repeatedly force a reset before the cause is confirmed.",
        "For an alarm that cannot be cleared, record the fault code, time and site conditions, then contact authorized service personnel."
      ]
    }
  ],
  de: [
    {
      id: "safety",
      title: "Sicherheitshinweise",
      body: [
        "Installation, Inbetriebnahme und Wartung dürfen nur von qualifiziertem Fachpersonal durchgeführt werden. Nach dem Trennen von DC-, AC- und Batterieversorgung mindestens 5 Minuten warten, bevor das Gehäuse geöffnet wird.",
        "Isolierte Werkzeuge und persönliche Schutzausrüstung verwenden. Vor dem Netzanschluss die örtlichen Netzanschlussregeln, Erdung und Schutzparameter prüfen."
      ]
    },
    {
      id: "installation",
      title: "Montage und Verkabelung",
      body: [
        "Das Gerät an einem gut belüfteten Ort und entfernt von brennbaren Materialien montieren. Ausreichend Abstand für Kühlung und Wartung einhalten.",
        "PV-, Batterie-, Ersatzstrom- und Netzkabel gemäß den Klemmenbezeichnungen anschließen. Zu geringes Drehmoment kann zu Überhitzung führen, zu hohes Drehmoment die Klemmen beschädigen."
      ]
    },
    {
      id: "operation",
      title: "Betriebsmodi",
      body: [
        "Die H5-Serie unterstützt Eigenverbrauch, Lastspitzenkappung, Ersatzstrom und Netzeinspeisung. Die Modi werden in der Inbetriebnahmeoberfläche ausgewählt.",
        "Im Ersatzstrombetrieb die kritischen Lasten innerhalb der Nennleistung halten. Bei Netzstörungen schaltet das System gemäß der konfigurierten Schutzstrategie um."
      ]
    },
    {
      id: "maintenance",
      title: "Wartung",
      body: [
        "Alle sechs Monate Luftführung, Klemmen und Alarmhistorie prüfen. Vor der Reinigung die Anlage freischalten. Kein Wasser in das Gehäuse sprühen und keine aggressiven Reiniger verwenden.",
        "Vor längerer Abschaltung den von Hersteller empfohlenen Ladezustand der Batterie einhalten und die Batterieanleitung zur Nachladung beachten."
      ]
    },
    {
      id: "troubleshooting",
      title: "Fehlersuche",
      body: [
        "Bei einem Isolationsfehler DC-Kabel, Stecker und Module auf Feuchtigkeit oder Beschädigung prüfen. Vor der Ursachenklärung keinen wiederholten Zwangs-Reset durchführen.",
        "Bei einem nicht quittierbaren Alarm Fehlercode, Uhrzeit und Standortbedingungen notieren und autorisierten Service kontaktieren."
      ]
    }
  ],
  fr: [
    {
      id: "safety",
      title: "Consignes de sécurité",
      body: [
        "L'installation, la mise en service et la maintenance doivent être effectuées par du personnel qualifié. Après avoir isolé les alimentations DC, AC et batterie, attendre au moins 5 minutes avant d'ouvrir le boîtier.",
        "Utiliser des outils isolés et des équipements de protection individuelle. Avant le raccordement au réseau, vérifier les exigences locales, la mise à la terre et les réglages de protection."
      ]
    },
    {
      id: "installation",
      title: "Installation et câblage",
      body: [
        "Installer l'appareil dans un endroit bien ventilé, à l'écart des matériaux inflammables. Prévoir un espace suffisant pour le refroidissement et l'entretien.",
        "Raccorder les câbles PV, batterie, charges de secours et réseau selon les repères des bornes. Un couple insuffisant peut provoquer une surchauffe, un couple excessif peut endommager les bornes."
      ]
    },
    {
      id: "operation",
      title: "Modes de fonctionnement",
      body: [
        "La série H5 prend en charge l'autoconsommation, l'effacement de pointe, l'alimentation de secours et l'injection réseau. Les modes se sélectionnent dans l'interface de mise en service.",
        "En mode secours, maintenir les charges critiques dans la limite de puissance de sortie. En cas de défaut réseau, le système commute selon la stratégie de protection configurée."
      ]
    },
    {
      id: "maintenance",
      title: "Maintenance",
      body: [
        "Contrôler tous les six mois le circuit de refroidissement, les bornes et l'historique des alarmes. Isoler l'installation avant le nettoyage. Ne jamais pulvériser d'eau dans le boîtier.",
        "Avant un arrêt prolongé, maintenir la batterie dans la plage de charge recommandée par le fabricant et suivre ses instructions de recharge périodique."
      ]
    },
    {
      id: "troubleshooting",
      title: "Dépannage",
      body: [
        "En cas de défaut d'isolement, contrôler l'humidité et l'état des câbles DC, connecteurs et modules. Ne pas répéter les réinitialisations forcées avant d'avoir identifié la cause.",
        "Si une alarme persiste, noter le code défaut, l'heure et les conditions du site, puis contacter le service agréé."
      ]
    }
  ],
  es: [
    {
      id: "safety",
      title: "Instrucciones de seguridad",
      body: [
        "La instalación, puesta en marcha y el mantenimiento deben realizarse por personal cualificado. Tras aislar las alimentaciones de CC, CA y batería, espere al menos 5 minutos antes de abrir la carcasa.",
        "Utilice herramientas aisladas y equipo de protección individual. Antes de conectar a la red, compruebe los requisitos locales, la puesta a tierra y los ajustes de protección."
      ]
    },
    {
      id: "installation",
      title: "Instalación y cableado",
      body: [
        "Instale el equipo en un lugar bien ventilado y alejado de materiales inflamables. Deje espacio suficiente para la refrigeración y el mantenimiento.",
        "Conecte los cables de PV, batería, carga de respaldo y red según las etiquetas. Un par de apriete bajo puede causar sobrecalentamiento y uno excesivo puede dañar los bornes."
      ]
    },
    {
      id: "operation",
      title: "Modos de funcionamiento",
      body: [
        "La serie H5 admite autoconsumo, reducción de puntas, suministro de respaldo y exportación a la red. Los modos se seleccionan en la interfaz de puesta en marcha.",
        "En modo respaldo, mantenga las cargas críticas dentro de la potencia nominal de salida. Ante un fallo de red, el sistema conmuta según la estrategia de protección configurada."
      ]
    },
    {
      id: "maintenance",
      title: "Mantenimiento",
      body: [
        "Cada seis meses revise el flujo de aire, los bornes y el historial de alarmas. Aísle el sistema antes de limpiarlo. No pulverice agua dentro de la carcasa ni utilice productos corrosivos.",
        "Antes de una parada prolongada, mantenga la batería en el rango de carga recomendado por el fabricante y siga sus instrucciones de recarga periódica."
      ]
    },
    {
      id: "troubleshooting",
      title: "Solución de problemas",
      body: [
        "Si aparece un fallo de aislamiento, inspeccione la humedad y el estado de los cables de CC, conectores y módulos. No repita los reinicios forzados antes de confirmar la causa.",
        "Si una alarma no se puede borrar, anote el código, la hora y las condiciones del emplazamiento y contacte con el servicio autorizado."
      ]
    }
  ],
  pt: [
    {
      id: "safety",
      title: "Informações de segurança",
      body: [
        "A instalação, colocação em serviço e manutenção devem ser realizadas por pessoal qualificado. Após isolar as alimentações CC, CA e bateria, aguarde pelo menos 5 minutos antes de abrir a caixa.",
        "Utilize ferramentas isoladas e equipamento de proteção individual. Antes da ligação à rede, confirme os requisitos locais, a ligação à terra e os ajustes de proteção."
      ]
    },
    {
      id: "installation",
      title: "Instalação e cablagem",
      body: [
        "Instale o equipamento num local bem ventilado, afastado de materiais inflamáveis. Deixe espaço suficiente para arrefecimento e manutenção.",
        "Ligue os cabos PV, bateria, carga de reserva e rede conforme as etiquetas dos terminais. Binário insuficiente pode causar sobreaquecimento; binário excessivo pode danificar os terminais."
      ]
    },
    {
      id: "operation",
      title: "Modos de funcionamento",
      body: [
        "A série H5 suporta autoconsumo, redução de picos, alimentação de reserva e exportação para a rede. Os modos são selecionados na interface de colocação em serviço.",
        "No modo de reserva, mantenha as cargas críticas dentro da potência nominal de saída. Em caso de falha da rede, o sistema comuta segundo a estratégia de proteção configurada."
      ]
    },
    {
      id: "maintenance",
      title: "Manutenção",
      body: [
        "A cada seis meses, verifique o percurso de arrefecimento, os terminais e o histórico de alarmes. Isole o sistema antes da limpeza. Não pulverize água para o interior da caixa.",
        "Antes de uma paragem prolongada, mantenha a bateria no intervalo de carga recomendado pelo fabricante e siga as instruções de recarga periódica."
      ]
    },
    {
      id: "troubleshooting",
      title: "Resolução de problemas",
      body: [
        "Se aparecer uma falha de isolamento, inspecione a humidade e o estado dos cabos CC, conectores e módulos. Não repita reinícios forçados antes de confirmar a causa.",
        "Se um alarme não puder ser eliminado, registe o código, a hora e as condições do local e contacte o serviço autorizado."
      ]
    }
  ]
};

const S6_SECTIONS = {
  zh: H5_SECTIONS.zh.map((section) => ({ ...section })),
  en: H5_SECTIONS.en.map((section) => ({ ...section })),
  de: H5_SECTIONS.de.map((section) => ({ ...section })),
  es: H5_SECTIONS.es.map((section) => ({ ...section }))
};

S6_SECTIONS.zh[2] = {
  id: "operation",
  title: "运行与监控",
  body: [
    "S6 系列用于光伏并网发电。启动前请确认直流开关、交流断路器及电网保护参数设置正确。",
    "可通过机身显示屏或监控平台查看实时功率、日发电量和告警信息。通信恢复后，历史数据会自动补传。"
  ]
};
S6_SECTIONS.en[2] = {
  id: "operation",
  title: "Operation and monitoring",
  body: [
    "The S6 series is designed for grid-connected PV generation. Before start-up, verify the DC switch, AC breaker and grid protection settings.",
    "View live power, daily yield and alarms on the local display or monitoring platform. Historical data is uploaded automatically when communications recover."
  ]
};
S6_SECTIONS.de[2] = {
  id: "operation",
  title: "Betrieb und Überwachung",
  body: [
    "Die S6-Serie ist für netzgekoppelte PV-Erzeugung vorgesehen. Vor dem Start DC-Schalter, AC-Schutz und Netzschutzparameter kontrollieren.",
    "Live-Leistung, Tagesertrag und Alarme werden am Display oder in der Monitoring-Plattform angezeigt. Nach einer Kommunikationsstörung werden Verlaufsdaten automatisch nachgeladen."
  ]
};
S6_SECTIONS.es[2] = {
  id: "operation",
  title: "Funcionamiento y monitorización",
  body: [
    "La serie S6 está diseñada para generación fotovoltaica conectada a la red. Antes del arranque, compruebe el interruptor de CC, el interruptor de CA y los parámetros de protección de red.",
    "Consulte la potencia instantánea, la producción diaria y las alarmas en la pantalla local o en la plataforma de monitorización."
  ]
};

export const manuals = [
  {
    id: "h5-hybrid",
    model: "H5",
    series: "Hybrid Energy Storage Inverter",
    category: "Hybrid",
    accent: "mint",
    featured: true,
    version: "1.4",
    updated: "2026-09-18",
    rating: "3–12 kW",
    docs: {
      zh: {
        title: "H5 系列混合式储能逆变器用户手册",
        summary: "涵盖安全、安装、运行模式、维护及常见故障处理。",
        sections: H5_SECTIONS.zh
      },
      en: {
        title: "H5 Hybrid Energy Storage Inverter User Manual",
        summary: "Safety, installation, operating modes, maintenance and troubleshooting.",
        sections: H5_SECTIONS.en
      },
      de: {
        title: "H5 Hybrid-Wechselrichter Benutzerhandbuch",
        summary: "Sicherheit, Montage, Betriebsmodi, Wartung und Fehlersuche.",
        sections: H5_SECTIONS.de
      },
      fr: {
        title: "Manuel d'utilisation de l'onduleur hybride H5",
        summary: "Sécurité, installation, modes de fonctionnement, maintenance et dépannage.",
        sections: H5_SECTIONS.fr
      },
      es: {
        title: "Manual del inversor híbrido H5",
        summary: "Seguridad, instalación, modos de funcionamiento, mantenimiento y diagnóstico.",
        sections: H5_SECTIONS.es
      },
      pt: {
        title: "Manual do inversor híbrido H5",
        summary: "Segurança, instalação, modos de funcionamento, manutenção e resolução de problemas.",
        sections: H5_SECTIONS.pt
      }
    }
  },
  {
    id: "s6-string",
    model: "S6",
    series: "Three-Phase PV String Inverter",
    category: "PV String",
    accent: "amber",
    featured: false,
    version: "2.1",
    updated: "2026-08-02",
    rating: "15–30 kW",
    docs: {
      zh: {
        title: "S6 系列三相光伏并网逆变器用户手册",
        summary: "三相光伏系统的安装、并网运行、监控与维护指南。",
        sections: S6_SECTIONS.zh
      },
      en: {
        title: "S6 Three-Phase PV String Inverter User Manual",
        summary: "Installation, grid operation, monitoring and maintenance for three-phase PV systems.",
        sections: S6_SECTIONS.en
      },
      de: {
        title: "S6 Dreiphasiger PV-String-Wechselrichter Benutzerhandbuch",
        summary: "Montage, Netzbetrieb, Überwachung und Wartung dreiphasiger PV-Anlagen.",
        sections: S6_SECTIONS.de
      },
      es: {
        title: "Manual del inversor fotovoltaico trifásico S6",
        summary: "Instalación, operación en red, monitorización y mantenimiento.",
        sections: S6_SECTIONS.es
      }
    }
  }
];

export function getCatalog() {
  return manuals.map(({ docs, ...product }) => ({
    ...product,
    languages: Object.keys(docs).map((code) => ({
      code,
      ...languageMeta[code]
    }))
  }));
}

export function getManual(productId, language) {
  const product = manuals.find((item) => item.id === productId);
  const doc = product?.docs[language];
  if (!product || !doc) return null;
  return {
    id: product.id,
    model: product.model,
    series: product.series,
    version: product.version,
    updated: product.updated,
    rating: product.rating,
    language: {
      code: language,
      ...languageMeta[language]
    },
    ...doc
  };
}
