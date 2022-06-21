class MajorityElement {
    moores_algorithm (a, size = a.length) {
        // a two step process
        // find the majority candidate
        // varify that it truly is a majority candidate

        const candidate = this.findCandidate(a, size);

        return this.verifyMajority(a, size, candidate);
    

    }

    findCandidate(a, size) {
        let maj_index = 0, count = 1;

        for (let i = 1; i < size; i++) {
            if(a[i] === a[maj_index]) {
                count++;
            } else {
                count--;
            }

            if(!count) {
                maj_index = i;
                count = 1;
            }
        }

        return a[maj_index];
    }

    verifyMajority (a, size, candidate) {
        let count = 0;
        for (let i = 0; i < size; i++) {
            if(a[i] === candidate) {
                count++
            }
        }

        if(count > Math.floor(size / 2)) {
            return true
        }

        return false
    }
}


console.log(new MajorityElement().moores_algorithm([3, 1, 3, 3, 2]))