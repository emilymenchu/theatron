const languages = {
    english: {
        name: 'English',
        code: 'en',
        flag: "🇬🇧"
    },
    spanish: {
        name: 'Español',
        code: 'es',
        flag: "🇪🇸"
    },
    french: {
        name: 'Français',
        code: 'fr',
        flag: "🇫🇷"
    },
    japanese: {
        name: '日本語 (Nihongo)',
        code: 'ja',
        flag: "🇯🇵"
    },
    korean: {
        name: '한국어 (Hangugeo)',
        code: 'ko',
        flag: "🇰🇷"
    },
    chinese: {
        name: '中文 (Zhōngwén)',
        code: 'zh',
        flag: "🇨🇳"
    },
    portuguese: {
        name: 'Português',
        code: 'pt',
        flag: "🇵🇹"
    },
    italian: {
        name: 'Italiano',
        code: 'it',
        flag: "🇮🇹"
    },
    russian: {
        name: 'Русский (Russkiy)',
        code: 'ru',
        flag: "🇷🇺"
    },
    german: {
        name: 'Deutsch',
        code: 'de',
        flag: "🇩🇪"
    }
}

const mpbTranslations = {
    en: {
        watch: "Watch Now",
        add: "+ Add To My Playlist",
        added: "Added to Playlist"
    },
    es: {
        watch: "Ver Ahora",
        add: "+ Agregar a mi Lista",
        added: "Agregado a la Lista"
    },
    fr: {
        watch: "Regarder Maintenant",
        add: "+ Ajouter à Ma Liste",
        added: "Ajouté à la Liste"
    },
    ja: {
        watch: "今すぐ見る",
        add: "+ プレイリストに追加",
        added: "プレイリストに追加済み"
    },
    ko: {
        watch: "지금 보기",
        add: "+ 내 재생 목록에 추가",
        added: "재생 목록에 추가됨"
    },
    zh: {
        watch: "立即观看",
        add: "+ 添加到播放列表",
        added: "已添加到播放列表"
    },
    pt: {
        watch: "Assistir Agora",
        add: "+ Adicionar à Minha Lista",
        added: "Adicionado à Lista"
    },
    it: {
        watch: "Guarda Ora",
        add: "+ Aggiungi alla Mia Lista",
        added: "Aggiunto alla Lista"
    },
    ru: {
        watch: "Смотреть Сейчас",
        add: "+ Добавить в Мой Плейлист",
        added: "Добавлено в Плейлист"
    },
    de: {
        watch: "Jetzt Anschauen",
        add: "+ Zur Meiner Liste Hinzufügen",
        added: "Zur Liste Hinzugefügt"
    }
};


const navTranslations = {
    en: {
        search: 'Search',
        home: "Home",
        series: "Series",
        movies: "Movies",
        list: "My List"
    },
    es: {
        search: 'Buscar',
        home: "Inicio",
        series: "Series",
        movies: "Películas",
        list: "Mi Lista"
    },
    fr: {
        search: 'Rechercher',
        home: "Accueil",
        series: "Séries",
        movies: "Films",
        list: "Ma Liste"
    },
    ja: {
        search: '検索',
        home: "ホーム",
        series: "シリーズ",
        movies: "映画",
        list: "マイリスト"
    },
    ko: {
        search: '검색',
        home: "홈",
        series: "시리즈",
        movies: "영화",
        list: "내 목록"
    },
    zh: {
        search: '搜索',
        home: "主页",
        series: "连续剧",
        movies: "电影",
        list: "我的列表"
    },
    pt: {
        search: 'Pesquisar',
        home: "Início",
        series: "Séries",
        movies: "Filmes",
        list: "Minha Lista"
    },
    it: {
        search: 'Cerca',
        home: "Home",
        series: "Serie",
        movies: "Film",
        list: "La Mia Lista"
    },
    ru: {
        search: 'Поиск',
        home: "Главная",
        series: "Сериалы",
        movies: "Фильмы",
        list: "Мой Список"
    },
    de: {
        search: 'Suche',
        home: "Startseite",
        series: "Serien",
        movies: "Filme",
        list: "Meine Liste"
    }
};

const homeTitleTranslation = {
    en: {
        trending: 'Trending Now',
        topSeries: 'Top Rated Series',
        popularMovies: 'Popular Movies',
        topMovies: 'Top Rated Movies',
        upcomingMovies: 'Upcoming Movies'
    },
    es: {
        trending: 'Tendencias',
        topSeries: 'Series Más Valoradas',
        popularMovies: 'Películas Populares',
        topMovies: 'Películas Más Valoradas',
        upcomingMovies: 'Próximas Películas'
    },
    fr: {
        trending: 'Tendances',
        topSeries: 'Séries Les Plus Évaluées',
        popularMovies: 'Films Populaires',
        topMovies: 'Films Les Plus Évalués',
        upcomingMovies: 'Films À Venir'
    },
    ja: {
        trending: 'トレンド',
        topSeries: '評価の高いシリーズ',
        popularMovies: '人気の映画',
        topMovies: '評価の高い映画',
        upcomingMovies: '今後の映画'
    },
    ko: {
        trending: '현재 유행',
        topSeries: '최고 등급 시리즈',
        popularMovies: '인기 영화',
        topMovies: '최고 등급 영화',
        upcomingMovies: '다가오는 영화'
    },
    zh: {
        trending: '当前趋势',
        topSeries: '高评分系列',
        popularMovies: '热门电影',
        topMovies: '高评分电影',
        upcomingMovies: '即将上映的电影'
    },
    pt: {
        trending: 'Tendências',
        topSeries: 'Séries Mais Avaliadas',
        popularMovies: 'Filmes Populares',
        topMovies: 'Filmes Mais Avaliados',
        upcomingMovies: 'Filmes em Breve'
    },
    it: {
        trending: 'Tendenze',
        topSeries: 'Serie Più Valutate',
        popularMovies: 'Film Popolari',
        topMovies: 'Film Più Valutati',
        upcomingMovies: 'Film in Arrivo'
    },
    ru: {
        trending: 'Популярное',
        topSeries: 'Сериалы с Высоким Рейтингом',
        popularMovies: 'Популярные Фильмы',
        topMovies: 'Фильмы с Высоким Рейтингом',
        upcomingMovies: 'Предстоящие Фильмы'
    },
    de: {
        trending: 'Aktuelle Trends',
        topSeries: 'Top Bewertete Serien',
        popularMovies: 'Beliebte Filme',
        topMovies: 'Top Bewertete Filme',
        upcomingMovies: 'Bevorstehende Filme'
    },
};

const previewTranslations = {
    en: {
        overview: 'Overview',
        categories: 'Categories',
        similar: 'Similar',
        creators: 'Creators:'
    },
    es: {
        overview: 'Descripción General',
        categories: 'Categorías',
        similar: 'Similares',
        creators: 'Creadores:'
    },
    fr: {
        overview: 'Aperçu',
        categories: 'Catégories',
        similar: 'Similaires',
        creators: 'Créateurs :'
    },
    ja: {
        overview: '概要',
        categories: 'カテゴリー',
        similar: '類似',
        creators: 'クリエイター：'
    },
    ko: {
        overview: '개요',
        categories: '카테고리',
        similar: '유사',
        creators: '제작자:'
    },
    zh: {
        overview: '概述',
        categories: '类别',
        similar: '相似',
        creators: '创作者：'
    },
    pt: {
        overview: 'Visão Geral',
        categories: 'Categorias',
        similar: 'Semelhantes',
        creators: 'Criadores:'
    },
    it: {
        overview: 'Panoramica',
        categories: 'Categorie',
        similar: 'Simili',
        creators: 'Creatori:'
    },
    ru: {
        overview: 'Обзор',
        categories: 'Категории',
        similar: 'Похожие',
        creators: 'Создатели:'
    },
    de: {
        overview: 'Überblick',
        categories: 'Kategorien',
        similar: 'Ähnlich',
        creators: 'Schöpfer:'
    },
};


const mediaTypeTranslations = {
    en: {
        movie: 'Movie',
        series: 'Series',
        person: 'Person'
    },
    es: {
        movie: 'Película',
        series: 'Serie',
        person: 'Persona'
    },
    fr: {
        movie: 'Film',
        series: 'Série',
        person: 'Personne'
    },
    ja: {
        movie: '映画',
        series: 'シリーズ',
        person: '人'
    },
    ko: {
        movie: '영화',
        series: '시리즈',
        person: '사람'
    },
    zh: {
        movie: '电影',
        series: '系列',
        person: '人'
    },
    pt: {
        movie: 'Filme',
        series: 'Série',
        person: 'Pessoa'
    },
    it: {
        movie: 'Film',
        series: 'Serie',
        person: 'Persona'
    },
    ru: {
        movie: 'Фильм',
        series: 'Сериал',
        person: 'Человек'
    },
    de: {
        movie: 'Film',
        series: 'Serie',
        person: 'Person'
    },
};

const myListTranslations = (emoji) => ({
    en: {
        title: `My Lists ${emoji}`,
        movieList: 'Movie Watch List',
        seriesList: 'Series Watch List',
        favoriteMovies: 'Favorite Movies',
        favoriteSeries: 'Favorite Series'
    },
    es: {
        title: `Mis Listas ${emoji}`,
        movieList: 'Lista de Películas para Ver',
        seriesList: 'Lista de Series para Ver',
        favoriteMovies: 'Películas Favoritas',
        favoriteSeries: 'Series Favoritas'
    },
    fr: {
        title: `Mes Listes ${emoji}`,
        movieList: 'Liste de Films à Voir',
        seriesList: 'Liste de Séries à Voir',
        favoriteMovies: 'Films Préférés',
        favoriteSeries: 'Séries Préférées'
    },
    ja: {
        title: `マイリスト ${emoji}`,
        movieList: '映画視聴リスト',
        seriesList: 'シリーズ視聴リスト',
        favoriteMovies: 'お気に入りの映画',
        favoriteSeries: 'お気に入りのシリーズ'
    },
    ko: {
        title: `내 목록 ${emoji}`,
        movieList: '영화 시청 목록',
        seriesList: '시리즈 시청 목록',
        favoriteMovies: '좋아하는 영화',
        favoriteSeries: '좋아하는 시리즈'
    },
    zh: {
        title: `我的列表 ${emoji}`,
        movieList: '电影观看列表',
        seriesList: '系列观看列表',
        favoriteMovies: '最喜欢的电影',
        favoriteSeries: '最喜欢的系列'
    },
    pt: {
        title: `Minhas Listas ${emoji}`,
        movieList: 'Lista de Filmes para Assistir',
        seriesList: 'Lista de Séries para Assistir',
        favoriteMovies: 'Filmes Favoritos',
        favoriteSeries: 'Séries Favoritas'
    },
    it: {
        title: `Le Mie Liste ${emoji}`,
        movieList: 'Lista di Film da Vedere',
        seriesList: 'Lista di Serie da Vedere',
        favoriteMovies: 'Film Preferiti',
        favoriteSeries: 'Serie Preferite'
    },
    ru: {
        title: `Мои Списки ${emoji}`,
        movieList: 'Список Фильмов для Просмотра',
        seriesList: 'Список Сериалов для Просмотра',
        favoriteMovies: 'Любимые Фильмы',
        favoriteSeries: 'Любимые Сериалы'
    },
    de: {
        title: `Meine Listen ${emoji}`,
        movieList: 'Filmliste zum Anschauen',
        seriesList: 'Serienliste zum Anschauen',
        favoriteMovies: 'Lieblingsfilme',
        favoriteSeries: 'Lieblingsserien'
    },
});

const searchTranslations = {
    en: {
        movies: 'Movies Related To',
        series: 'Series Related To'
    },
    es: {
        movies: 'Películas Relacionadas Con',
        series: 'Series Relacionadas Con'
    },
    fr: {
        movies: 'Films Liés À',
        series: 'Séries Liées À'
    },
    ja: {
        movies: '関連する映画',
        series: '関連するシリーズ'
    },
    ko: {
        movies: '관련된 영화',
        series: '관련된 시리즈'
    },
    zh: {
        movies: '相关电影',
        series: '相关系列'
    },
    pt: {
        movies: 'Filmes Relacionados Com',
        series: 'Séries Relacionadas Com'
    },
    it: {
        movies: 'Film Correlati A',
        series: 'Serie Correlate A'
    },
    ru: {
        movies: 'Фильмы, Связанные С',
        series: 'Сериалы, Связанные С'
    },
    de: {
        movies: 'Filme Im Zusammenhang Mit',
        series: 'Serien Im Zusammenhang Mit'
    },
};

const footerTranslations = {
    en: {
        message: "Developed by"
    },
    es: {
        message: "Desarrollado por"
    },
    fr: {
        message: "Développé par"
    },
    ja: {
        message: "開発者"
    },
    ko: {
        message: "개발자"
    },
    zh: {
        message: "开发者"
    },
    pt: {
        message: "Desenvolvido por"
    },
    it: {
        message: "Sviluppato da"
    },
    ru: {
        message: "Разработано"
    },
    de: {
        message: "Entwickelt von"
    },
};

const seeMoreTranslations = {
    en: {
        text: 'See More'
    },
    es: {
        text: 'Ver Más'
    },
    fr: {
        text: 'Voir Plus'
    },
    ja: {
        text: 'もっと見る'
    },
    ko: {
        text: '더 보기'
    },
    zh: {
        text: '查看更多'
    },
    pt: {
        text: 'Ver Mais'
    },
    it: {
        text: 'Vedi Di Più'
    },
    ru: {
        text: 'Узнать Больше'
    },
    de: {
        text: 'Mehr Sehen'
    },
};
