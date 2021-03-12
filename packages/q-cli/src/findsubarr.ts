function test(s: number, arr: any[]) {
    let satisfied: any[] = [];
    for (let i = 0; i < arr.length; i++) {
        let total = 0;
        let subArr: any[] = [];
        for (let j = i; j < arr.length; j++) {
            total = total + arr[j]
            subArr.push(arr[j])
            if (total >= s) {
                satisfied.push(subArr);
                break;
            }
        }
    }
    return satisfied
}
let t = [2, 3, 1, 2, 4, 3];
let res = test(7, t);
console.log(res);
