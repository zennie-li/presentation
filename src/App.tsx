import { useEffect, useState } from 'react'

type Slide = {
  eyebrow: string
  title: string
  lead: string
  points: string[]
  note: string
  takeaway: string
  visual: string
}

const slides: Slide[] = [
  {
    eyebrow: 'Биохимия • 01',
    title: 'Когда клетке не хватает энергии',
    lead:
      'Патология углеводного обмена при нарушении окислительного и субстратного фосфорилирования',
    points: [
      'Глюкоза — обязательный или преимущественный субстрат для эритроцитов, мозга и работающей мышцы',
      'Катаболизм включает гликолиз, окислительное декарбоксилирование пирувата, цикл Кребса и дыхательную цепь',
      'АТФ поддерживает Na⁺/K⁺-АТФазу, мембранный потенциал, биосинтез, сокращение и внутриклеточный транспорт',
      'Снижение продукции АТФ ведёт к деполяризации мембраны, отёку клетки, Ca²⁺-перегрузке и повреждению тканей',
      'Нарушения могут быть первичными — вследствие мутаций ферментов и белков митохондрий — или вторичными при гипоксии, интоксикации, сепсисе, печёночной недостаточности и дефиците витаминов.',
    ],
    note: 'Наиболее чувствительны ткани с высоким потреблением энергии и малым запасом субстратов: ЦНС, миокард, скелетные мышцы.',
    takeaway: 'Главная идея: болезнь возникает не только из-за глюкозы, но и из-за невозможности превратить её энергию в АТФ.',
    visual: 'hero',
  },
  {
    eyebrow: 'Энергетическая карта • 02',
    title: 'Путь глюкозы к АТФ',
    lead: 'Три этапа образуют единую энергетическую цепь.',
    points: [
      'Гликолиз в цитозоле: глюкоза → 2 пирувата + 2 АТФ + 2 NADH',
      'Пируватдегидрогеназный комплекс: пируват → ацетил-КоА; кофакторы — TPP (B₁), липоат, FAD, NAD⁺, КоА',
      'Цикл Кребса в матриксе: ацетил-КоА окисляется до CO₂ с образованием NADH, FADH₂ и GTP',
      'Дыхательная цепь принимает электроны, создаёт протонный градиент и обеспечивает большую часть синтеза АТФ',
      'Скорость пути регулируют энергетический заряд клетки и доступность субстратов: АТФ и цитрат тормозят фосфофруктокиназу-1, а АМФ и фруктозо-2,6-бисфосфат активируют её.',
    ],
    note: 'Аэробный выход составляет примерно 30–32 АТФ: цифра зависит от типа челночной системы для цитозольного NADH.',
    takeaway: 'При полном аэробном окислении одной глюкозы образуется около 30–32 АТФ.',
    visual: 'path',
  },
  {
    eyebrow: 'Цитоплазма • 03',
    title: 'Субстратное фосфорилирование',
    lead: 'АТФ образуется напрямую — фосфат переносится с субстрата на АДФ.',
    points: [
      'АТФ или GTP образуется прямым переносом макроэргического фосфата на АДФ или ГДФ',
      'В гликолизе: 1,3-бисфосфоглицерат → 3-фосфоглицерат и фосфоенолпируват → пируват',
      'В цикле Кребса: сукцинил-КоА → сукцинат с образованием GTP, эквивалентного АТФ',
      'Процесс не использует O₂ и внутреннюю мембрану митохондрий, но зависит от наличия метаболического субстрата',
      'При анаэробных условиях восстановление пирувата до лактата регенерирует NAD⁺, без которого реакция глицеральдегид-3-фосфатдегидрогеназы и весь гликолиз остановятся.',
    ],
    note: 'Эритроцит не содержит митохондрий: все его энергетические потребности покрываются субстратным фосфорилированием.',
    takeaway: 'Это быстрый, автономный, но маломощный способ получения энергии.',
    visual: 'substrate',
  },
  {
    eyebrow: 'Митохондрия • 04',
    title: 'Окислительное фосфорилирование',
    lead: 'Электроны создают протонный градиент, а АТФ-синтаза превращает его в энергию.',
    points: [
      'NADH отдаёт электроны комплексу I, FADH₂ — комплексу II; переносчики — коэнзим Q и цитохром c',
      'Комплексы I, III и IV перекачивают H⁺ в межмембранное пространство; комплекс II протоны не переносит',
      'O₂ принимает электроны на комплексе IV и восстанавливается до H₂O',
      'Протон-движущая сила используется комплексом V (F₀F₁-АТФ-синтазой) для фосфорилирования АДФ',
      'Сопряжение переноса электронов с фосфорилированием требует неповреждённой внутренней мембраны; её проницаемость контролирует эффективность синтеза АТФ и теплопродукцию.',
    ],
    note: 'Цианиды и CO блокируют комплекс IV; олигомицин — АТФ-синтазу; разобщители рассеивают градиент в виде тепла.',
    takeaway: 'Без кислорода или исправной мембраны основной поток синтеза АТФ останавливается.',
    visual: 'mitochondria',
  },
  {
    eyebrow: 'Механизм повреждения • 05',
    title: 'Что происходит при сбое',
    lead: 'Энергетическая недостаточность запускает каскад взаимосвязанных нарушений.',
    points: [
      '↓ АТФ → отказ Na⁺/K⁺- и Ca²⁺-насосов, клеточный отёк, деполяризация и Ca²⁺-перегрузка',
      '↑ отношения NADH/NAD⁺ тормозит пируватдегидрогеназу и реакции цикла Кребса',
      'Для регенерации NAD⁺ лактатдегидрогеназа восстанавливает пируват до лактата',
      'Утечка электронов образует активные формы кислорода: повреждаются липиды, белки и мтДНК',
      'Активация фосфолипаз, протеаз и эндонуклеаз усиливает повреждение, а открытие поры митохондриальной проницаемости может запустить апоптоз или некроз.',
    ],
    note: 'Лактатацидоз — метаболический ацидоз с увеличенным анионным интервалом; тяжесть зависит от продукции и печёночного клиренса лактата.',
    takeaway: 'Клетка переключается на анаэробный гликолиз, но его мощности недостаточно.',
    visual: 'cascade',
  },
  {
    eyebrow: 'Наследственные болезни • 06',
    title: 'Дефекты гликолиза',
    lead: 'Мутации ферментов снижают образование АТФ непосредственно из глюкозы.',
    points: [
      'Дефицит пируваткиназы (PKLR, аутосомно-рецессивный) снижает АТФ в эритроците → ригидность мембраны и гемолиз',
      'Типичны хроническая несфероцитарная анемия, желтуха, спленомегалия и увеличение 2,3-БФГ',
      'Дефицит мышечной фосфофруктокиназы (болезнь Таруи, GSD VII) блокирует ключевой регулируемый этап гликолиза',
      'Физическая нагрузка вызывает спазмы, слабость, миоглобинурию; при Таруи возможен также гемолиз',
      'Диагноз подтверждают исследованием активности фермента и молекулярно-генетическим тестом; лечение включает профилактику провоцирующих нагрузок и индивидуальную коррекцию анемии.',
    ],
    note: 'В отличие от болезни Мак-Ардла, при Таруи приём углеводов перед нагрузкой может ухудшать переносимость упражнения.',
    takeaway: 'Клиническая картина отражает то, какая ткань сильнее зависит от повреждённого пути.',
    visual: 'rbc',
  },
  {
    eyebrow: 'Пируватный узел • 07',
    title: 'Лактатацидоз и дефицит ПДГ',
    lead: 'Пируватдегидрогеназа связывает гликолиз с циклом Кребса.',
    points: [
      'Дефицит ПДГ блокирует превращение пирувата в ацетил-КоА и уменьшает приток углерода в цикл Кребса',
      'Избыток пирувата превращается в лактат и аланин; лактат/пируват часто остаётся <20',
      'Дефект комплекса I дыхательной цепи повышает NADH и обычно увеличивает отношение лактат/пируват >20',
      'Проявления: врождённый лактатацидоз, гипотония, судороги, атаксия и задержка психомоторного развития',
      'При нейровизуализации возможны агенезия мозолистого тела, вентрикуломегалия и поражение базальных ганглиев; тяжесть зависит от остаточной активности комплекса.',
    ],
    note: 'Возможные подходы при дефиците ПДГ: кетогенная диета, тиамин при чувствительных вариантах; лечение ведёт метаболическая команда.',
    takeaway: 'Отношение лактат/пируват помогает локализовать метаболический блок.',
    visual: 'fork',
  },
  {
    eyebrow: 'Митохондриальные болезни • 08',
    title: 'Поломка дыхательной цепи',
    lead: 'Дефекты комплексов I–V нарушают перенос электронов и синтез АТФ.',
    points: [
      'MELAS: энцефаломиопатия, лактатацидоз, мигрень, судороги и инсультоподобные эпизоды вне сосудистых бассейнов',
      'Синдром Лея: регресс навыков и симметричные поражения базальных ганглиев/ствола мозга на МРТ',
      'Мутации мтДНК наследуются по материнской линии; ядерные дефекты следуют менделевским типам наследования',
      'Гетероплазмия и пороговый эффект объясняют различную тяжесть и мультисистемность заболевания',
      'Помимо MELAS и синдрома Лея встречаются MERRF, нейропатия Лебера и синдром Кернса—Сейра; один генотип может формировать разные фенотипы.',
    ],
    note: 'Подозревайте митохондриальную болезнь при сочетании неврологических, мышечных, сердечных, слуховых и эндокринных симптомов.',
    takeaway: 'Высокоэнергозависимые органы образуют типичную мишень: мозг + мышцы + сердце.',
    visual: 'organs',
  },
  {
    eyebrow: 'Клиническое мышление • 09',
    title: 'Как подтвердить диагноз',
    lead: 'Диагностика соединяет клинику, биохимию и молекулярную генетику.',
    points: [
      'Первично: глюкоза, лактат и пируват одновременно, pH/газы крови, электролиты, анионный интервал, кетоны и аммиак',
      'Дополнительно: КФК, АЛТ/АСТ, ЛДГ, ацилкарнитины, аминокислоты плазмы и органические кислоты мочи',
      'МРТ головного мозга и МР-спектроскопия выявляют характерные очаги и лактатный пик',
      'Подтверждение: панель генов/секвенирование мтДНК, анализ числа копий; иногда ферментология или биопсия мышцы',
      'Нормальный лактат не исключает митохондриальную болезнь: показатель может повышаться только при нагрузке или кризе, поэтому результат всегда сопоставляют с фенотипом и семейным анамнезом.',
    ],
    note: 'Повторите лактат в покое: плач, судороги, нагрузка, тугой жгут и задержка обработки дают ложное повышение.',
    takeaway: 'Образец лактата берут без длительного жгута и быстро охлаждают — иначе результат ложно повысится.',
    visual: 'diagnosis',
  },
  {
    eyebrow: 'Итоги • 10',
    title: 'От механизма — к терапии',
    lead: 'Лечение индивидуально: устранить триггер, поддержать энергообмен, предупредить криз.',
    points: [
      'При кризе: ABC-стабилизация, кислород по показаниям, коррекция гипогликемии, дегидратации и электролитов',
      'Лечить провоцирующий фактор и предупреждать катаболизм; тяжёлый ацидоз требует интенсивного наблюдения',
      'Диета и кофакторы зависят от дефекта: универсальной «митохондриальной схемы» лечения нет',
      'Долгосрочно: кардио-, невро-, аудио- и эндокринный мониторинг, план экстренной помощи и генетическое консультирование',
      'Пациенту и семье объясняют ранние признаки декомпенсации — рвоту, нарастающую слабость, сонливость, одышку и судороги — при которых требуется срочная медицинская помощь.',
    ],
    note: 'Вальпроат особенно опасен при дефектах POLG; метформин повышает риск лактатацидоза у предрасположенных пациентов.',
    takeaway: 'Раннее распознавание энергетического кризиса защищает наиболее уязвимые органы.',
    visual: 'summary',
  },
]

const clinicalPhotos: Record<string, { src: string; alt: string; credit: string; caption: string }> = {
  hero: {
    src: './photos/hero.jpg',
    alt: 'Врач беседует с пациентом в стационаре',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Пациент с метаболическим нарушением нуждается в комплексной оценке функций органов',
  },
  path: {
    src: './photos/path.jpg',
    alt: 'Врач объясняет пациенту результаты обследования',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Разбор энергетического обмена помогает связать лабораторные изменения с симптомами',
  },
  substrate: {
    src: './photos/substrate.jpg',
    alt: 'Пациентка выполняет упражнение во время медицинского обследования',
    credit: 'Nguyễn Hiệp / Unsplash',
    caption: 'Физическая нагрузка быстро выявляет недостаточность анаэробного энергообеспечения мышц',
  },
  mitochondria: {
    src: './photos/mitochondria.jpg',
    alt: 'Ребёнок находится в больничной палате',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Митохондриальные дефекты часто дебютируют в детстве неврологическими симптомами',
  },
  cascade: {
    src: './photos/cascade.jpg',
    alt: 'Врач наблюдает пациента в больничной палате',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Энергетический криз может быстро привести к нарушению сознания и полиорганной дисфункции',
  },
  rbc: {
    src: './photos/rbc.jpg',
    alt: 'Медицинский работник берёт кровь у пациента',
    credit: 'Nguyễn Hiệp / Unsplash',
    caption: 'При гемолитической анемии исследуют гемограмму, ретикулоциты, билирубин и ферменты эритроцита',
  },
  fork: {
    src: './photos/fork.jpg',
    alt: 'Врач осматривает ребёнка в стационаре',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Врождённый лактатацидоз требует раннего осмотра невролога и врача-генетика',
  },
  organs: {
    src: './photos/organs.jpg',
    alt: 'Ребёнок с игрушкой во время лечения в больнице',
    credit: 'National Cancer Institute / Unsplash',
    caption: 'Митохондриальные болезни у детей имеют мультисистемное и прогрессирующее течение',
  },
  diagnosis: {
    src: './photos/diagnosis.jpg',
    alt: 'Забор венозной крови для лабораторного исследования',
    credit: 'Hush Naidoo Jade Photography / Unsplash',
    caption: 'Правильный забор и быстрая обработка крови критичны для достоверного измерения лактата',
  },
  summary: {
    src: './photos/summary.jpg',
    alt: 'Медицинский специалист помогает пациенту во время реабилитации',
    credit: 'Navy Medicine / Unsplash',
    caption: 'Реабилитация и динамическое наблюдение дополняют метаболическую терапию',
  },
}

const Molecule = ({ x, y, label, accent = false }: { x: number; y: number; label: string; accent?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="34" className={accent ? 'svg-fill-accent' : 'svg-fill-panel'} />
    <circle r="34" className="svg-stroke" />
    <text className="svg-label" textAnchor="middle" dominantBaseline="middle">{label}</text>
  </g>
)

function Illustration({ type }: { type: string }) {
  if (type === 'hero') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Глюкоза поступает в митохондрию, где образуется АТФ">
      <defs><linearGradient id="m" x1="0" x2="1"><stop stopColor="#1f8f85" /><stop offset="1" stopColor="#74d7b6" /></linearGradient></defs>
      <path d="M151 119C233 42 390 72 415 168c27 104-72 203-184 177-82-19-152-149-80-226Z" fill="url(#m)" opacity=".18" />
      <path d="M165 148c59-61 187-54 220 17 32 69-44 152-129 150-77-2-143-113-91-167Z" className="svg-stroke-strong" />
      <path d="M193 193c32-38 71 44 108 0s66 38 47 69" className="svg-stroke-accent" />
      <Molecule x={85} y={210} label="C₆H₁₂O₆" />
      <path d="M121 210h48" className="svg-arrow" />
      <Molecule x={424} y={286} label="ATP" accent />
      <path d="M369 285h20" className="svg-arrow" />
      <circle cx="273" cy="74" r="8" className="svg-fill-hot" />
      <circle cx="299" cy="59" r="5" className="svg-fill-hot" />
      <text x="288" y="38" className="svg-caption">O₂</text>
    </svg>
  )
  if (type === 'path') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Три этапа превращения глюкозы в АТФ">
      <path d="M80 102H440M80 210H440M80 318H440" className="svg-line-soft" />
      <Molecule x={92} y={102} label="1" accent /><Molecule x={92} y={210} label="2" /><Molecule x={92} y={318} label="3" />
      <text x="151" y="91" className="svg-title">ГЛИКОЛИЗ</text><text x="151" y="118" className="svg-caption">2 АТФ • цитоплазма</text>
      <text x="151" y="199" className="svg-title">ЦИКЛ КРЕБСА</text><text x="151" y="226" className="svg-caption">NADH + FADH₂</text>
      <text x="151" y="307" className="svg-title">ДЫХАТЕЛЬНАЯ ЦЕПЬ</text><text x="151" y="334" className="svg-caption">≈ 26–28 АТФ</text>
      <path d="M451 102v216" className="svg-arrow" />
    </svg>
  )
  if (type === 'substrate') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Прямой перенос фосфата с субстрата на АДФ">
      <Molecule x={100} y={194} label="S—P" /><Molecule x={260} y={194} label="АДФ" />
      <path d="M139 194h80" className="svg-arrow" />
      <path d="M299 194h72" className="svg-arrow" />
      <Molecule x={418} y={194} label="АТФ" accent />
      <circle cx="180" cy="159" r="16" className="svg-fill-hot" /><text x="180" y="164" textAnchor="middle" className="svg-mini">P</text>
      <path d="M180 175c20 57 42 68 73 50" className="svg-stroke-accent" />
      <text x="260" y="296" textAnchor="middle" className="svg-caption">прямой перенос фосфата</text>
      <text x="260" y="330" textAnchor="middle" className="svg-title">O₂ НЕ НУЖЕН</text>
    </svg>
  )
  if (type === 'mitochondria') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Дыхательная цепь и АТФ-синтаза во внутренней мембране митохондрии">
      <path d="M36 118c85 20 112-28 190 0s114-26 258 0M36 278c85 20 112-28 190 0s114-26 258 0" className="svg-stroke-strong" />
      {[100,180,260,340].map((x,i)=><g key={x}><rect x={x-22} y="116" width="44" height="164" rx="18" className={i===3?'svg-fill-accent':'svg-fill-panel'} /><text x={x} y="205" textAnchor="middle" className="svg-label">{['I','II','III','IV'][i]}</text></g>)}
      {[76,144,216,292,370].map(x=><g key={x}><circle cx={x} cy="75" r="8" className="svg-fill-hot" /><text x={x} y="55" textAnchor="middle" className="svg-mini">H⁺</text></g>)}
      <path d="M404 90v198" className="svg-arrow" />
      <circle cx="430" cy="322" r="42" className="svg-fill-accent" /><text x="430" y="327" textAnchor="middle" className="svg-label">АТФ</text>
      <text x="260" y="376" textAnchor="middle" className="svg-caption">внутренняя мембрана митохондрии</text>
    </svg>
  )
  if (type === 'cascade') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Каскад последствий энергетического сбоя">
      <Molecule x={260} y={72} label="СБОЙ" accent />
      <path d="M260 108v55M260 163L120 215M260 163l140 52M260 163v52" className="svg-arrow" />
      <Molecule x={112} y={250} label="↓АТФ" /><Molecule x={260} y={250} label="↑NADH" /><Molecule x={408} y={250} label="↑ROS" />
      <path d="M112 286v45M260 286v45M408 286v45" className="svg-arrow" />
      <text x="112" y="366" textAnchor="middle" className="svg-caption">насосы</text>
      <text x="260" y="366" textAnchor="middle" className="svg-caption">лактат</text>
      <text x="408" y="366" textAnchor="middle" className="svg-caption">повреждение</text>
    </svg>
  )
  if (type === 'rbc') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Эритроцит зависит от гликолиза из-за отсутствия митохондрий">
      <ellipse cx="250" cy="202" rx="170" ry="116" className="svg-fill-red" />
      <ellipse cx="250" cy="202" rx="90" ry="50" className="svg-fill-bg" opacity=".42" />
      <path d="M64 102l72 42M380 277l76 40" className="svg-line-soft" />
      <Molecule x={85} y={82} label="ГЛЮ" /><Molecule x={435} y={337} label="2 ATP" accent />
      <text x="250" y="198" textAnchor="middle" className="svg-title light">НЕТ</text>
      <text x="250" y="228" textAnchor="middle" className="svg-caption light">митохондрий</text>
      <text x="250" y="382" textAnchor="middle" className="svg-caption">эритроцит полностью зависит от гликолиза</text>
    </svg>
  )
  if (type === 'fork') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Пируватный метаболический узел с блоком пируватдегидрогеназы">
      <Molecule x={110} y={205} label="ПИР" />
      <path d="M147 205h68M252 190l90-79M252 220l90 79" className="svg-arrow" />
      <rect x="205" y="172" width="60" height="66" rx="18" className="svg-fill-red" /><text x="235" y="211" textAnchor="middle" className="svg-label light">ПДГ</text>
      <path d="M198 158l76 93" className="svg-stroke-hot" />
      <Molecule x={390} y={85} label="ЛАК" accent /><Molecule x={390} y={325} label="Ац-КоА" />
      <text x="390" y="145" textAnchor="middle" className="svg-caption">накапливается</text>
      <text x="390" y="385" textAnchor="middle" className="svg-caption">не образуется</text>
    </svg>
  )
  if (type === 'organs') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Органы-мишени митохондриальных болезней">
      <path d="M260 62c-34-23-82 7-69 53-36 2-43 54-9 67 8 39 55 43 78 18 23 25 70 21 78-18 34-13 27-65-9-67 13-46-35-76-69-53Z" className="svg-fill-accent" />
      <path d="M117 267c-40 4-62 36-48 70 12 30 42 37 67 16 22-19 35-63 18-78-9-8-21-10-37-8Zm286 0c40 4 62 36 48 70-12 30-42 37-67 16-22-19-35-63-18-78 9-8 21-10 37-8Z" className="svg-fill-red" />
      <path d="M239 233c-49-37-89 24-59 66 23 32 80 67 80 67s57-35 80-67c30-42-10-103-59-66l-21 20-21-20Z" className="svg-fill-hot" />
      <text x="260" y="125" textAnchor="middle" className="svg-label">МОЗГ</text>
      <text x="260" y="327" textAnchor="middle" className="svg-label light">СЕРДЦЕ</text>
      <text x="55" y="245" className="svg-caption">МЫШЦЫ</text><text x="390" y="245" className="svg-caption">МЫШЦЫ</text>
    </svg>
  )
  if (type === 'diagnosis') return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Диагностическая воронка от симптомов к генетическому диагнозу">
      <path d="M55 72h410l-52 78H107L55 72Zm62 104h286l-52 78H169l-52-78Zm62 104h162l-52 78h-58l-52-78Z" className="svg-fill-panel svg-stroke" />
      <text x="260" y="119" textAnchor="middle" className="svg-title">КЛИНИКА</text>
      <text x="260" y="223" textAnchor="middle" className="svg-title">БИОХИМИЯ</text>
      <text x="260" y="327" textAnchor="middle" className="svg-title">ДНК</text>
      <circle cx="447" cy="319" r="45" className="svg-fill-accent" /><path d="M430 319l12 13 24-28" className="svg-check" />
    </svg>
  )
  return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Три направления помощи при энергетическом кризе">
      <circle cx="260" cy="210" r="78" className="svg-fill-accent" />
      <text x="260" y="202" textAnchor="middle" className="svg-label">ЗАЩИТА</text><text x="260" y="229" textAnchor="middle" className="svg-caption">клетки</text>
      <path d="M203 158L132 89M317 158l71-69M260 288v78" className="svg-arrow" />
      <Molecule x={105} y={66} label="O₂" /><Molecule x={415} y={66} label="АТФ" /><Molecule x={260} y={370} label="ПИТ" />
      <text x="72" y="131" className="svg-caption">триггеры</text><text x="373" y="131" className="svg-caption">кофакторы</text>
    </svg>
  )
}

export default function App() {
  const [active, setActive] = useState(0)
  const go = (next: number) => setActive(Math.max(0, Math.min(slides.length - 1, next)))
  const printMode = new URLSearchParams(window.location.search).has('print')

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) go(active + 1)
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) go(active - 1)
      if (event.key === 'Home') go(0)
      if (event.key === 'End') go(slides.length - 1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [active])

  if (printMode) {
    return (
      <main className="print-deck">
        {slides.map((item, index) => (
          <article className="deck print-page" key={item.title}>
            <header className="topbar">
              <div className="brand"><span className="brand-mark" />МЕТАБОЛИЗМ / УЧЕБНАЯ ПРЕЗЕНТАЦИЯ</div>
              <div className="counter"><strong>{String(index + 1).padStart(2, '0')}</strong><span>/ 10</span></div>
            </header>
            <section className="slide">
              <div className="content">
                <div className="eyebrow">{item.eyebrow}</div>
                <h1>{item.title}</h1>
                <p className="lead">{item.lead}</p>
                <p className="slide-text">{item.points.join('. ')}.</p>
                <div className="clinical-note"><span>КЛИНИЧЕСКАЯ ПОДСКАЗКА</span><p>{item.note}</p></div>
              </div>
              <div className="visual-panel">
                <img className="clinical-photo" src={clinicalPhotos[item.visual].src} alt={clinicalPhotos[item.visual].alt} />
                <div className="photo-shade" />
                <div className="photo-caption">
                  <span>КЛИНИЧЕСКИЙ КОНТЕКСТ</span>
                  <p>{clinicalPhotos[item.visual].caption}</p>
                  <small>Фото: {clinicalPhotos[item.visual].credit}</small>
                </div>
              </div>
              <div className="takeaway"><span>КЛЮЧЕВОЙ ВЫВОД</span><p>{item.takeaway}</p></div>
            </section>
            <footer className="footer print-footer">
              <span className="nav-button">←</span>
              <div className="progress">
                {slides.map((_, dot) => <span key={dot} className={dot === index ? 'dot active' : 'dot'} />)}
              </div>
              <span className="nav-button">→</span>
            </footer>
          </article>
        ))}
      </main>
    )
  }

  const slide = slides[active]
  return (
    <main className="deck">
      <header className="topbar">
        <div className="brand"><span className="brand-mark" />МЕТАБОЛИЗМ / УЧЕБНАЯ ПРЕЗЕНТАЦИЯ</div>
        <div className="topbar-actions">
          <a className="download-link" href="./presentation.pdf" download="Патология_углеводного_обмена.pdf">СКАЧАТЬ PDF</a>
          <div className="counter"><strong>{String(active + 1).padStart(2, '0')}</strong><span>/ 10</span></div>
        </div>
      </header>

      <section className="slide" key={active}>
        <div className="content">
          <div className="eyebrow">{slide.eyebrow}</div>
          <h1>{slide.title}</h1>
          <p className="lead">{slide.lead}</p>
          <p className="slide-text">{slide.points.join('. ')}.</p>
          <div className="clinical-note"><span>КЛИНИЧЕСКАЯ ПОДСКАЗКА</span><p>{slide.note}</p></div>
        </div>
        <div className="visual-panel">
          <img className="clinical-photo" src={clinicalPhotos[slide.visual].src} alt={clinicalPhotos[slide.visual].alt} />
          <div className="photo-shade" />
          <div className="photo-caption">
            <span>КЛИНИЧЕСКИЙ КОНТЕКСТ</span>
            <p>{clinicalPhotos[slide.visual].caption}</p>
            <small>Фото: {clinicalPhotos[slide.visual].credit}</small>
          </div>
        </div>
        <div className="takeaway"><span>КЛЮЧЕВОЙ ВЫВОД</span><p>{slide.takeaway}</p></div>
      </section>

      <footer className="footer">
        <button className="nav-button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Предыдущий слайд">←</button>
        <nav className="progress" aria-label="Навигация по слайдам">
          {slides.map((item, index) => (
            <button key={item.title} className={index === active ? 'dot active' : 'dot'} onClick={() => go(index)} aria-label={`Слайд ${index + 1}: ${item.title}`} />
          ))}
        </nav>
        <button className="nav-button" onClick={() => go(active + 1)} disabled={active === slides.length - 1} aria-label="Следующий слайд">→</button>
      </footer>
    </main>
  )
}
