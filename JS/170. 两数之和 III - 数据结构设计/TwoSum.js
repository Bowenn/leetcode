/**
 * Initialize your data structure here.
 */
var TwoSum = function() {
    this.list = new Map();
};

/**
 * Add the number to an internal data structure.. 
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function(number) {
    if(this.list.has(number)){
        this.list.set(number, this.list.get(number)+1);
    }else{
        this.list.set(number, 1)
    }
};

/**
 * Find if there exists any pair of numbers which sum is equal to the value. 
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function(value) {
    for(let n of this.list.keys()){
        if (this.list.has(value-n) && (n != value-n || this.list.get(n)>1)) return true;
    }
    return false;
};

/** 
 * Your TwoSum object will be instantiated and called as such:
 * var obj = new TwoSum()
 * obj.add(number)
 * var param_2 = obj.find(value)
 */