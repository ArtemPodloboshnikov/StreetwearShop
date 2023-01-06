import { ACCESSORIES_PATH, OUTERWEAR_PATH, SHOES_PATH, UNDERWEAR_PATH } from "./links";

// sidebar
export enum Gender {
    MALE,
    FEMALE
}

// category
type CategoriesData = {
    [key: string]: {
        srcs: string[],
        titles: string[],
        tos: string[]
    }
}

export const CATEGORIES_BY_LINK: CategoriesData = {
    [SHOES_PATH]: {
        srcs: ['/navbar/bekini.avif', '/navbar/coat.avif', '/navbar/fur_coat.avif', 'jacket', 't_shirts'],
        titles: ['бикини', 'пальто', 'шубы', 'куртки', 'футболки'],
        tos: ['/bekini', '/coat', '/furcoat', '/jacket', '/tshirts']
    },
    [UNDERWEAR_PATH]: {
        srcs: ['/navbar/bekini.avif', '/navbar/coat.avif', '/navbar/fur_coat.avif', 'jacket', 't_shirts'],
        titles: ['бикини', 'пальто', 'шубы', 'куртки', 'футболки'],
        tos: ['/bekini', '/coat', '/furcoat', '/jacket', '/tshirts']
    },
    [OUTERWEAR_PATH]: {
        srcs: ['/navbar/bekini.avif', '/navbar/coat.avif', '/navbar/fur_coat.avif', '/navbar/jacket.avif', '/navbar/t_shirts.avif', '/navbar/bekini.avif'],
        titles: ['бикини', 'пальто', 'шубы', 'куртки', 'футболки', 'бикини'],
        tos: ['/bekini', '/coat', '/furcoat', '/jacket', '/tshirts', '/bekini']
    },
    [ACCESSORIES_PATH]: {
        srcs: ['/navbar/bekini.avif', '/navbar/coat.avif', '/navbar/fur_coat.avif', 'jacket', 't_shirts'],
        titles: ['бикини', 'пальто', 'шубы', 'куртки', 'футболки'],
        tos: ['/bekini', '/coat', '/furcoat', '/jacket', '/tshirts']
    },
}

// navbar
export const NAVBAR_OPTIONS = [
    {
        text: 'обувь',
        href: SHOES_PATH
    },
    {
        text: 'нижняя одежда',
        href: UNDERWEAR_PATH
    },
    {
        text: 'верхняя одежда',
        href: OUTERWEAR_PATH
    },
    {
        text: 'аксессуары',
        href: ACCESSORIES_PATH
    }
];

// sizes
export const SIZES = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
]

export const TABLES_SIZES = {
    [Gender.FEMALE]: [
        {
            title: 'Женская одежда: платья, блузки, кофты',
            content: {
                titles: [
                    'Российский размер',
                    'Международный размер',
                    'Обхват груди (см)',
                    'Обхват талии (см)',
                    'Обхват бедер (см)',
                    'Длина рукава (см)',
                    'Англия (UK)',
                    'США (US)',
                    'Европа (EU)'
                ],
                sizes: [
                    ['38', 'XXS', '76', '58', '82', '58-60', '4/30', '0', '32'],
                    ['40', 'XS', '80', '62', '86', '59-61', '6/32', '2', '34'],
                    ['42', 'S', '84', '66', '92', '59-61', '8/32', '4', '36'],
                    ['44', 'M', '80', '62', '86', '59-61', '6/36', '6', '38'],
                    ['46', 'M', '92', '74', '100', '60-62', '12/38', '8', '40'],
                    ['48', 'L', '96', '78', '104', '60-62', '14/40', '10', '42'],
                    ['50', 'L', '100', '82', '108', '61-63', '16/42', '12', '44'],
                    ['50', 'XL', '104', '86', '112', '61-63', '18/44', '14', '46'],
                    ['54', 'XXL', '108', '90', '116', '61-63', '20/46', '16', '48'],
                    ['56', 'XXL', '112', '94', '120', '61-63', '22/48', '18', '50'],
                ]
            }
        }
    ],
    [Gender.MALE]: [
        {
            title: 'Муржская одежда: пиджаки, рубашки',
            content: {
                titles: [
                    'Российский размер',
                    'Международный размер',
                    'Обхват груди (см)',
                    'Обхват талии (см)',
                    'Обхват бедер (см)',
                    'Длина рукава (см)',
                    'Англия (UK)',
                    'США (US)',
                    'Европа (EU)'
                ],
                sizes: [
                    ['38', 'XXS', '76', '58', '82', '58-60', '4/30', '0', '32'],
                    ['40', 'XS', '80', '62', '86', '59-61', '6/32', '2', '34'],
                    ['42', 'S', '84', '66', '92', '59-61', '8/32', '4', '36'],
                    ['44', 'M', '80', '62', '86', '59-61', '6/36', '6', '38'],
                    ['46', 'M', '92', '74', '100', '60-62', '12/38', '8', '40'],
                    ['48', 'L', '96', '78', '104', '60-62', '14/40', '10', '42'],
                    ['50', 'L', '100', '82', '108', '61-63', '16/42', '12', '44'],
                    ['50', 'XL', '104', '86', '112', '61-63', '18/44', '14', '46'],
                    ['54', 'XXL', '108', '90', '116', '61-63', '20/46', '16', '48'],
                    ['56', 'XXL', '112', '94', '120', '61-63', '22/48', '18', '50'],
                ]
            }
        }
    ]
}

// root
export const DATA_IMAGES = [
    {
        src: '/root/sneakers.avif',
        alt: 'Обувь',
        to: SHOES_PATH
    },
    {
        src: '/root/pants.avif',
        alt: 'Нижняя одежда',
        to: UNDERWEAR_PATH
    },
    {
        src: '/root/jacket.avif',
        alt: 'Верхняя одежда',
        to: OUTERWEAR_PATH
    },
    {
        src: '/root/cap.avif',
        alt: 'Аксессуары',
        to: ACCESSORIES_PATH
    },
];

// colorPicker

export enum Colors {
    RED = 'красный',
    BLUE = 'синий',
    WHITE = 'белый',
    GREEN = 'зелёный',
    BLACK = 'чёрный',
    YELLOW = 'жёлтый',
    ORANGE = 'оранжевый',
    VIOLET = 'фиолетовый',
    BROWN = 'коричневый',
    GRAY = 'серый',
    PINK = 'розовый',
    TURQUOISE = 'бирюзовый'
}

export const COLORS = [
    {
        hex: '#000',
        text: Colors.BLACK
    },
    {
        hex: '#1500ff',
        text: Colors.BLUE
    },
    {
        hex: '#451000',
        text: Colors.BROWN
    },
    {
        hex: '#383838',
        text: Colors.GRAY
    },
    {
        hex: '#07de1c',
        text: Colors.GREEN
    },
    {
        hex: '#e57e07',
        text: Colors.ORANGE
    },
    {
        hex: '#f20c0c',
        text: Colors.RED
    },
    {
        hex: '#8f0cf2',
        text: Colors.VIOLET
    },
    {
        hex: '#fff',
        text: Colors.WHITE
    },
    {
        hex: '#e2f514',
        text: Colors.YELLOW
    },
    {
        hex: '#f514cf',
        text: Colors.PINK
    },
    {
        hex: '#14e6f5',
        text: Colors.TURQUOISE
    }
]

// FAQ

export const FAQ_CONTENT = [
    {
        question: 'Возврат средств',
        answer: 'ваыаыаывавааыаыавыавыаыава'
    }
]

// admin

export const CATEGORIES: {[key: number]: { [clothes: string]: string[]}} = {
    [Gender.MALE]: {
        'Обувь': ['кроссовки', 'кеды'],
        'Верхняя одежда': ['футболки', 'куртки', 'майки', 'худи'],
        'Нижняя одежда': ['шорты', 'брюки', 'джинсы'],
        'Аксессуары': ['бейсболки', 'кольца']
    },
    [Gender.FEMALE]: {
        'Обувь': ['кроссовки', 'кеды'],
        'Верхняя одежда': ['футболки', 'куртки', 'майки', 'худи'],
        'Нижняя одежда': ['шорты', 'брюки', 'джинсы'],
        'Аксессуары': ['бейсболки', 'кольца']
    }
}