class StockSpanner {
    prices: number[][]; // ([price, date])
    date: number;

    constructor() {
        this.prices = [];
        this.date = 0;
    }

    next(price: number): number {
        while (this.prices.length && this.prices[this.prices.length - 1][0] <= price) {
            this.prices.pop();
        }
        this.date++;
        if (this.prices.length) {
            const res = this.date - this.prices[this.prices.length - 1][1];
            this.prices.push([price, this.date]);
            return res;
        }
        this.prices.push([price, this.date]);
        return this.date;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
