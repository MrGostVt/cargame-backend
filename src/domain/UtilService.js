
const utilService = {
    async checkBody(body = {}, ...props){
        if(props.length === 0){
            for (const key in body) {
                props.push(key);
            }
            if(props.length === 0){
                return false;
            }
        }

        for (const prop of props) {
            if (!body.hasOwnProperty(prop) || !!body[prop]) {
                return false;
            }
        }
        return true;
    }
}
export default utilService;