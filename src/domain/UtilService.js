
const utilService = {
    async checkBody(body = {}, props){
        const returnValue = {problems: [], isHasProblems: false};

        if(props.length === 0){
            for (const key in body) {
                props.push(key);
            }
            if(props.length === 0){
                returnValue.isHasProblems = true;
                return returnValue;
            }
        }
        for (const prop of props) {
            if (!body.hasOwnProperty(prop) || (!body[prop] && body[prop] != 0)) {
                returnValue.problems.push(`${prop}:${body[prop]}`);
            }
            if(typeof body[prop] === 'object'){
                const jrBodyCheck = await this.checkBody(body[prop], []);
                for(const problem in jrBodyCheck.problems){
                    returnValue.problems.push(prop + '.' + problem + `:${body[prop][problem]}`);
                }
            }
        }

        returnValue.isHasProblems = returnValue.problems.length > 0;
        if(returnValue.isHasProblems) console.log(returnValue.problems);
        return returnValue;
    }
}
export default utilService;