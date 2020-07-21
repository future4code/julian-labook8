import {v4} from 'uuid'

export class IdGenertor{
    public generate():string{
        return v4()
    };
}
const idGenerator = new IdGenertor();