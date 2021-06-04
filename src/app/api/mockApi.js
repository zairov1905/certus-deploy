// import {delay} from '../common/util/util';
import { delay } from '../util/util';
import {sampleData} from './sampleData';
import {sampleDataCrm} from './sampleDataCrm';
import { sampleDataCounterparty } from './sampleDataCounterparty';
import { sampleDataDepartments } from './sampleDataDepartments';
import { sampleDataDocs } from './sampleDataDocs';
import { sampleDataDocumentTypes } from './sampleDataDocumentTypes';
import { sampleDataDuties } from './sampleDataDuties';
import { sampleDataExpense } from './sampleDataExpense';
import { sampleDataExpenseGroups } from './sampleDataExpenseGroups';
import { sampleDataExpenseTypes } from './sampleDataExpenseTypes';
import {sampleDataLab } from './sampleDataLab';
import { sampleDataOrder } from './sampleDataOrder';
import { sampleDataOrderSource } from './sampleDataOrderSource';
import { sampleDataReference } from './sampleDataReference';
import { sampleDataServiceTypes } from './sampleDataServiceTypes';
import { sampleDataProductService } from './sampleDataProductService';
import { sampleDataSignOfLegalAct } from './sampleDataSignOfLegalAct';
import { sampleDataSkill } from './sampleDataSkill';
import { sampleDataTraining } from './sampleDataTraining';
import { sampleDataPersonal } from './sampleDataPersonal';

export function fetchSampleData(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleData)
    })
}


export function fetchSampleDataOrder(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataOrder);
    })
}
export function fetchSampleDataLab(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataLab);
    })
}
export function fetchSampleDataExpense(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataExpense);
    })
}
export function fetchSampleDataDocumentTypes(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataDocumentTypes);
    })
}
export function fetchSampleDataDepartments(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataDepartments);
    })
}
export function fethcSampleDataDuties(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataDuties);
    })
}
export function fethcSampleDataDocs(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataDocs);
    })
}

export function fetchSampleDataCounterParty(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataCounterparty);
    })
}
export function fetchSampleDataSkill(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataSkill);
    })
}
export function fetchSampleDataTraining(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataTraining);
    })
}
export function fetchSampleDataExpenseGroups(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataExpenseGroups);
    })
}
export function fetchSampleDataExpenseTypes(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataExpenseTypes);
    })
}
export function fetchSampleDataServiceTypes(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataServiceTypes);
    })
}
export function fetchSampleDataOrderSource(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataOrderSource);
    })
}
export function fetchSampleDataReference(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataReference);
    })
}
export function fetchSampleDataCrm(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataCrm);
    })
}

export function fetchSampleDataProductService(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataProductService);
    })
}
export function fetchSampleDataPersonal(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataPersonal);
    })
}
export function fetchSampleDataSignOfLegalAct(){
    return delay(1000).then(function(){
        return Promise.resolve(sampleDataSignOfLegalAct);
    })
}
