// All bilingual copy lives here. Edit freely.
// Arabic copy is written natively — warm, poetic — not machine-translated.

export type Lang = "en" | "ar";

export const translations = {
  meta: {
    coupleScript: { en: "Salma & Tariq", ar: "سلمى وطارق" },
    coupleAmpersand: { en: "&", ar: "و" },
    weddingDate: { en: "October 17, 2026", ar: "السابع عشر من تشرين الأول ٢٠٢٦" },
    weddingDateShort: { en: "17 · 10 · 2026", ar: "١٧ · ١٠ · ٢٠٢٦" },
    venueShort: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
    venueFull: {
      en: "Dar Al-Yasmine Estate · Amman Hills",
      ar: "دار الياسمين · تلال عمّان",
    },
  },

  // The sealed envelope entrance
  envelope: {
    eyebrow: { en: "You're invited", ar: "دعوة زفاف" },
    monogram: { en: "S & T", ar: "س و ط" },
    tap: { en: "Tap the seal to open", ar: "اضغط الختم للفتح" },
    skip: { en: "Skip intro", ar: "تخطّي المقدمة" },
    openingHint: { en: "Opening…", ar: "تُفتح الآن…" },
    replay: { en: "Replay entrance", ar: "إعادة المقدمة" },
    coverEyebrow: { en: "An invitation", ar: "دعوة" },
    coverDate: { en: "17 · 10 · 2026", ar: "١٧ · ١٠ · ٢٠٢٦" },
  },

  // Navigation links
  nav: {
    invitation: { en: "Invitation", ar: "الدعوة" },
    countdown: { en: "Countdown", ar: "العدّ التنازلي" },
    story: { en: "Our Story", ar: "حكايتنا" },
    events: { en: "Celebrations", ar: "الاحتفالات" },
    order: { en: "Order of the Day", ar: "برنامج اليوم" },
    dressCode: { en: "Dress Code", ar: "اللباس" },
    gallery: { en: "Gallery", ar: "المعرض" },
    stay: { en: "Where to Stay", ar: "أماكن الإقامة" },
    rsvp: { en: "RSVP", ar: "تأكيد الحضور" },
    gifts: { en: "Gifts", ar: "الهدايا" },
    venue: { en: "Venue & Map", ar: "المكان والخريطة" },
  },

  hero: {
    eyebrow: { en: "We're getting married", ar: "سنتزوّج" },
    scrollCue: { en: "Scroll", ar: "اسحب للأسفل" },
    locationLabel: { en: "in the hills of Amman", ar: "في تلال عمّان" },
  },

  invitation: {
    heading: { en: "The Invitation", ar: "الدعوة" },
    intro: {
      en: "Together with their families,",
      ar: "بحضور أهليهما وبركتهم،",
    },
    body: {
      en: "Salma & Tariq request the pleasure of your company as they exchange vows and begin a life together beneath the jasmine and lanterns of an autumn evening.",
      ar: "يتشرّف سلمى وطارق بدعوتكم لمشاركتهما لحظة العمر، تحت ضوء الفوانيس وعبق الياسمين في أمسية خريفية لا تُنسى.",
    },
    when: { en: "When", ar: "متى" },
    where: { en: "Where", ar: "أين" },
    viewMap: { en: "View on map", ar: "عرض على الخريطة" },
    dateLong: {
      en: "Saturday, October 17, 2026 · 5:00 PM",
      ar: "السبت ١٧ تشرين الأول ٢٠٢٦ · الخامسة مساءً",
    },
  },

  countdown: {
    heading: { en: "Until we say 'I do'", ar: "حتى نقول 'نعم'" },
    days: { en: "Days", ar: "يوم" },
    hours: { en: "Hours", ar: "ساعة" },
    minutes: { en: "Minutes", ar: "دقيقة" },
    seconds: { en: "Seconds", ar: "ثانية" },
  },

  story: {
    heading: { en: "Our Story", ar: "حكايتنا" },
    chapters: [
      {
        title: { en: "How we met", ar: "كيف التقينا" },
        body: {
          en: "A rainy November in Beirut, an unattended umbrella, and a borrowed coffee that neither of us ever returned.",
          ar: "في تشرين ممطر ببيروت، مظلّة مهملة وفنجان قهوة لم نُعِده يومًا.",
        },
      },
      {
        title: { en: "First date", ar: "أول لقاء" },
        body: {
          en: "Roman ruins in Jerash at sunset. We talked until the guards politely asked us to leave.",
          ar: "آثار جرش عند الغروب. تحدثنا حتى طلب منّا الحرّاس المغادرة بلطف.",
        },
      },
      {
        title: { en: "The proposal", ar: "العرض" },
        body: {
          en: "On a balcony in Amman, beneath bougainvillea and a borrowed string of lights.",
          ar: "في شرفة بعمّان، تحت الجهنّمية وضوء فوانيس مستعارة.",
        },
      },
      {
        title: { en: "Forever", ar: "إلى الأبد" },
        body: {
          en: "And now, the rest of our lives — beginning with you, here, on October 17th.",
          ar: "وها نحن نبدأ بقية العمر — معكم، هنا، في السابع عشر من تشرين.",
        },
      },
    ],
  },

  events: {
    heading: { en: "The Celebrations", ar: "الاحتفالات" },
    subheading: {
      en: "Three evenings, woven together",
      ar: "ثلاث ليالٍ تنسج فرحًا واحدًا",
    },
    addToCalendar: { en: "Add to calendar", ar: "أضف إلى التقويم" },
    viewMap: { en: "View map", ar: "عرض الخريطة" },
    items: [
      {
        key: "henna",
        name: { en: "Henna Night", ar: "ليلة الحنّة" },
        date: { en: "Friday, October 16, 2026", ar: "الجمعة ١٦ تشرين الأول ٢٠٢٦" },
        time: { en: "7:30 PM", ar: "السابعة والنصف مساءً" },
        venue: { en: "The Family Courtyard", ar: "بيت العائلة" },
        blurb: {
          en: "An evening of music, henna, and bright Levantine joy.",
          ar: "أمسية من الموسيقى والحنّة وفرح الشام الأصيل.",
        },
      },
      {
        key: "katb",
        name: { en: "Katb Al-Kitab", ar: "عقد القران" },
        date: { en: "Saturday, October 17, 2026", ar: "السبت ١٧ تشرين الأول ٢٠٢٦" },
        time: { en: "4:00 PM", ar: "الرابعة عصرًا" },
        venue: { en: "Dar Al-Yasmine Chapel Garden", ar: "حديقة دار الياسمين" },
        blurb: {
          en: "A quiet, sacred ceremony among family and closest friends.",
          ar: "حفل عقد القران بحضور العائلة والأصدقاء المقرّبين.",
        },
      },
      {
        key: "reception",
        name: { en: "The Wedding Reception", ar: "حفل الزفاف" },
        date: { en: "Saturday, October 17, 2026", ar: "السبت ١٧ تشرين الأول ٢٠٢٦" },
        time: { en: "7:00 PM until late", ar: "السابعة مساءً حتى وقتٍ متأخّر" },
        venue: { en: "Dar Al-Yasmine Estate", ar: "دار الياسمين" },
        blurb: {
          en: "Dinner, dancing, and lantern-lit revelry beneath the stars.",
          ar: "عشاء ورقص وفوانيس تحت سماء الخريف.",
        },
      },
    ],
  },

  order: {
    heading: { en: "Order of the Day", ar: "برنامج اليوم" },
    items: [
      { time: { en: "4:00 PM", ar: "٤:٠٠ م" }, title: { en: "Arrival & Welcome", ar: "الاستقبال" } },
      { time: { en: "5:00 PM", ar: "٥:٠٠ م" }, title: { en: "Ceremony", ar: "حفل الزواج" } },
      { time: { en: "7:00 PM", ar: "٧:٠٠ م" }, title: { en: "Dinner", ar: "العشاء" } },
      { time: { en: "9:00 PM", ar: "٩:٠٠ م" }, title: { en: "First Dance", ar: "الرقصة الأولى" } },
      { time: { en: "10:00 PM", ar: "١٠:٠٠ م" }, title: { en: "Celebration", ar: "السهرة" } },
    ],
  },

  dress: {
    heading: { en: "Dress Code", ar: "اللباس" },
    title: { en: "Black Tie", ar: "لباس رسمي" },
    body: {
      en: "Tuxedos and floor-length evening gowns. Ivory, champagne, and soft gold are encouraged; we kindly ask guests to leave pure white to the bride.",
      ar: "بدلات سهرة وفساتين طويلة. نُرحّب بألوان العاج والشمبانيا والذهبي الناعم؛ ونرجو من الضيوف ترك اللون الأبيض الكامل للعروس.",
    },
    paletteLabel: { en: "Suggested palette", ar: "الألوان المقترحة" },
  },

  gallery: {
    heading: { en: "Moments", ar: "لحظات" },
    subheading: {
      en: "From our engagement, by candle and bougainvillea",
      ar: "من خطبتنا، بين الشمعة والجهنّمية",
    },
  },

  stay: {
    heading: { en: "Where to Stay", ar: "أماكن الإقامة" },
    subheading: {
      en: "Three favorites within twenty minutes of the venue",
      ar: "ثلاث وجهات مفضّلة على بُعد عشرين دقيقة من المكان",
    },
    perNight: { en: "/ night", ar: "/ ليلة" },
    bookingSoon: { en: "Booking link coming soon", ar: "رابط الحجز قريبًا" },
    hotels: [
      {
        name: { en: "The Olive House", ar: "بيت الزيتون" },
        blurb: {
          en: "A converted limestone villa with a quiet courtyard.",
          ar: "فيلا حجرية قديمة بفناءٍ هادئ.",
        },
        price: { en: "JOD 120", ar: "١٢٠ د.أ" },
      },
      {
        name: { en: "Bab Al-Hara Boutique", ar: "نُزُل باب الحارة" },
        blurb: {
          en: "Family-run, with jasmine on every balcony.",
          ar: "نُزُل عائليّ، الياسمين على كل شرفة.",
        },
        price: { en: "JOD 95", ar: "٩٥ د.أ" },
      },
      {
        name: { en: "Riad Yasmine", ar: "رياض الياسمين" },
        blurb: {
          en: "Andalusian arches, a hammam, and a long rooftop sunset.",
          ar: "أقواس أندلسية، حمّام، وغروب طويل على السطح.",
        },
        price: { en: "JOD 165", ar: "١٦٥ د.أ" },
      },
    ],
  },

  rsvp: {
    heading: { en: "RSVP", ar: "تأكيد الحضور" },
    subheading: {
      en: "Kindly respond by September 17, 2026",
      ar: "نرجو التأكيد قبل السابع عشر من أيلول ٢٠٢٦",
    },
    step: { en: "Step", ar: "خطوة" },
    of: { en: "of", ar: "من" },
    next: { en: "Continue", ar: "متابعة" },
    back: { en: "Back", ar: "عودة" },
    submit: { en: "Send our love", ar: "أرسل التحيات" },
    q1: { en: "Will you celebrate with us?", ar: "هل ستحتفلون معنا؟" },
    accept: { en: "Joyfully accept", ar: "بكلّ فرحٍ، سنحضر" },
    decline: { en: "Regretfully decline", ar: "للأسف، لن نتمكّن" },
    q2: { en: "Which events will you attend?", ar: "ما الفعاليات التي ستحضرونها؟" },
    q3: { en: "How many in your party?", ar: "كم عدد الحضور من جهتكم؟" },
    q4: { en: "Your details", ar: "بياناتكم" },
    fullName: { en: "Full name", ar: "الاسم الكامل" },
    emailOrPhone: { en: "Email or phone", ar: "البريد أو الهاتف" },
    children: { en: "Any children accompanying?", ar: "هل سيرافقكم أطفال؟" },
    yes: { en: "Yes", ar: "نعم" },
    no: { en: "No", ar: "لا" },
    childCount: { en: "How many children?", ar: "كم عدد الأطفال؟" },
    q5: { en: "A note for the couple", ar: "كلمة للعروسين" },
    songRequest: { en: "A song to dance to", ar: "أغنية للرقص" },
    message: { en: "A message", ar: "رسالة" },
    review: { en: "Review", ar: "المراجعة" },
    successHeading: {
      en: "Thank you — we can't wait to celebrate with you",
      ar: "شكرًا لكم — لا نطيق صبرًا للاحتفال معكم",
    },
    successBody: {
      en: "Your reply has been received with love.",
      ar: "وصلت دعوتكم إلينا بكلّ حب.",
    },
    required: { en: "Please fill this in", ar: "يرجى تعبئة هذا الحقل" },
    invalidEmail: { en: "That doesn't look quite right", ar: "صيغة غير صحيحة" },
  },

  gifts: {
    heading: { en: "Gifts", ar: "الهدايا" },
    intro: {
      en: "Your presence is the greatest gift, but if you wish to contribute…",
      ar: "حضوركم أجمل هدية، وإن أردتم المساهمة…",
    },
    honeymoon: { en: "Honeymoon Fund", ar: "صندوق شهر العسل" },
    honeymoonBody: {
      en: "Toward a fortnight under southern skies.",
      ar: "نحو أسبوعين تحت سماءٍ جنوبية.",
    },
    contribute: { en: "Contribute", ar: "المساهمة" },
    cliq: { en: "CliQ alias", ar: "اسم CliQ" },
    bank: { en: "Bank details", ar: "تفاصيل البنك" },
    close: { en: "Close", ar: "إغلاق" },
  },

  venue: {
    heading: { en: "Venue & Map", ar: "المكان والخريطة" },
    name: { en: "Dar Al-Yasmine Estate", ar: "دار الياسمين" },
    address: {
      en: "Wadi Al-Seer Road · Amman Hills · Jordan",
      ar: "طريق وادي السير · تلال عمّان · الأردن",
    },
    directions: {
      en: "Twenty minutes from downtown Amman, past the olive grove, follow the lanterns up the hill.",
      ar: "عشرون دقيقة من وسط البلد، بعد بساتين الزيتون، اتبعوا الفوانيس صعودًا على التلّة.",
    },
  },

  closing: {
    line: { en: "With love,", ar: "بكلّ الحب،" },
    couple: { en: "Salma & Tariq", ar: "سلمى وطارق" },
  },

  footer: {
    music: { en: "Music: 'Habibi Ya Eini' · Trio Joubran", ar: "الموسيقى: 'حبيبي يا عيني' · ثلاثي جبران" },
    credit: { en: "Designed & built by House of Raed", ar: "تصميم وتطوير House of Raed" },
  },

  ui: {
    languageToggle: { en: "ع", ar: "EN" },
    musicOn: { en: "Music on", ar: "تشغيل الموسيقى" },
    musicOff: { en: "Music off", ar: "إيقاف الموسيقى" },
    rsvpFloating: { en: "RSVP", ar: "تأكيد" },
    soon: { en: "Coming soon", ar: "قريبًا" },
    optional: { en: "Optional", ar: "اختياري" },
    close: { en: "Close", ar: "إغلاق" },
    prev: { en: "Previous", ar: "السابق" },
    nextImage: { en: "Next", ar: "التالي" },
  },
} as const;

export type Translations = typeof translations;
