interface Window { config: any }
interface Config { priceRefresh: number; sliderRefresh: number }

window.config = (function () {

    return createConfig(2000, 5000);

    function createConfig(priceRefresh: number, sliderRefresh: number) : Config {
        return { priceRefresh: priceRefresh, sliderRefresh: sliderRefresh};
    }
} ());