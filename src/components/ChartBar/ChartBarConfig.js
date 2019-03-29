class ChartBarConfig {

    constructor() {
        this.chartData = {
            lineCounter: 0,
            multiplyWidth: 0,
            linePercentageArr: []
        };
    }

    calculateChart(percent) {
        console.log("percent...", percent);
        if (percent <= 25) {
            this.chartData = {
                lineCounter: 1,
                multiplyWidth: 4,
                linePercentageArr: [0, 25]
            };
        }

        else if (percent <= 50) {
            this.chartData = {
                lineCounter: 2,
                multiplyWidth: 2,
                linePercentageArr: [0, 25, 50]
            };
        }

        else if (percent <= 75) {
            this.chartData = {
                lineCounter: 3,
                multiplyWidth: 1.333,
                linePercentageArr: [0, 25, 50,75]
            };
        }

        else if (percent <= 100) {
            this.chartData = {
                lineCounter: 10,
                multiplyWidth: 1,
                linePercentageArr: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            }
        }
    }

}

export default ChartBarConfig;