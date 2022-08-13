import React, { useEffect, useState } from 'react';
import styles from './View.module.css'
import data from "../../data/foundation.json";
import checkmark from "../../images/checkmark.svg"

// the below interface declartion is used to declare the type of state startupStageData
// startupStageData could work as refector where the values are read abd modifies directly from this state
interface StartupData {
    foundation: Array<Record<string, any>>,
    discovery: Array<Record<string, any>>,
    delivery: Array<Record<string, any>>
}

const View = () => {
    // eslint-disable-next-line 
    const [startupStageData, setStartupStageData] = useState<StartupData>()
    const [startupFoundationData, setstartupFoundationData] = useState(Array<any>)
    const [startupDiscoveryData, setstartupDiscoveryData] = useState(Array<any>)
    const [startupDeliveryData, setstartupDeliveryData] = useState(Array<any>)
    const [randomFact, setRandomFact] = useState(String)
    const [foundationComplete, setFoundationComplete] = useState(Boolean)
    const [discoveryComplete, setDiscoveryComplete] = useState(Boolean)
    const [deliveryComplete, setDeliveryComplete] = useState(Boolean)

    useEffect(() => {
        setStartupStageData(data)
        setstartupFoundationData(data?.foundation)
        setstartupDiscoveryData(data?.discovery)
        setstartupDeliveryData(data?.delivery)
        const randomFact = JSON.parse(localStorage.getItem('random-fact')!);
        if (randomFact) {
            setRandomFact(randomFact)
        }

        
    },
    // eslint-disable-next-line
    [])

    useEffect(() => {
        const foundation = JSON.parse(localStorage.getItem('foundation')!);
        const foundationComplete = JSON.parse(localStorage.getItem('foundation-complete')!);
        if (foundation) {
            setstartupFoundationData(foundation);
            setFoundationComplete(foundationComplete)
        }
    }, [])

    useEffect(() => {
        const discovery = JSON.parse(localStorage.getItem('discovery')!);
        const foundationComplete = JSON.parse(localStorage.getItem('discovery-complete')!);
        if (discovery) {
            setstartupDiscoveryData(discovery);
            setDiscoveryComplete(foundationComplete)
        }
    }, [])

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery')!);
        const foundationComplete = JSON.parse(localStorage.getItem('delivery-complete')!);

        if (delivery) {
            setstartupDeliveryData(delivery);
            setDeliveryComplete(foundationComplete)
        }
    }, [])


    const checkAllStepCompleted = () => {
        
        let finalArrayCheck
        const foundationArray: Array<any> = []
        startupFoundationData.forEach(({ check }) => foundationArray.push(check))

        const discoveryArray: Array<any> = []
        startupDiscoveryData.forEach(({ check }) => discoveryArray.push(check))

        const deliveryArray: Array<any> = []
        startupDeliveryData.forEach(({ check }) => deliveryArray.push(check))

        finalArrayCheck = foundationArray.concat(discoveryArray, deliveryArray)
        if(!foundationArray.includes(false)) {
            setFoundationComplete(true)
            localStorage.setItem('foundation-complete', JSON.stringify(foundationComplete));
        }
        
        if(!discoveryArray.includes(false)) {
            setDiscoveryComplete(true)
            localStorage.setItem('discovery-complete', JSON.stringify(discoveryComplete));
        }

        if(!deliveryArray.includes(false)) {
            setDeliveryComplete(true)
            localStorage.setItem('delivery-complete', JSON.stringify(deliveryComplete));
        }

        if(!finalArrayCheck.includes(false) && !randomFact) {
            localStorage.setItem('foundation-complete', JSON.stringify(true));
            localStorage.setItem('discovery-complete', JSON.stringify(true));
            localStorage.setItem('delivery-complete', JSON.stringify(true));
            fetchRandomFact()
        }
    }

    const fetchRandomFact = async () => {
        const url = 'https://uselessfacts.jsph.pl/random.json';
        let res = null;
        
        try {
            res = await (await fetch(url)).json();
        } catch(err) {
            return err
        }
        
        setRandomFact(res.text)
        localStorage.setItem('random-fact', JSON.stringify(res.text));
    }
    


    const toggleCheckboxChange = (sectionName: string, val: boolean, index: number) => {
    
        if (sectionName === 'foundation') {
            startupFoundationData.find(val => val.id === index).check = val
            localStorage.setItem('current step', JSON.stringify(startupFoundationData.find(val => val.id === index).text));
            localStorage.setItem('foundation', JSON.stringify(startupFoundationData));
            
            setstartupFoundationData(startupFoundationData);
            checkAllStepCompleted()
            // });
        } else if(sectionName === 'discovery') {
            startupDiscoveryData.find(val => val.id === index).check = val
            localStorage.setItem('current step', JSON.stringify(startupDiscoveryData.find(val => val.id === index).text));
            localStorage.setItem('discovery', JSON.stringify(startupDiscoveryData));
            
            setstartupDiscoveryData(startupDiscoveryData);
            checkAllStepCompleted()

        } else if(sectionName === 'delivery') {
            startupDeliveryData.find(val => val.id === index).check = val
            localStorage.setItem('current step', JSON.stringify(startupDeliveryData.find(val => val.id === index).text));
            localStorage.setItem('delivery', JSON.stringify(startupDeliveryData));
            
            setstartupDeliveryData(startupDeliveryData);
            checkAllStepCompleted()

        }    
 
    }

    return (
        <div className={styles.container}>
            <h1 aria-label='My startup progess' data-testid="heading" id='heading'>My startup progess</h1>
            <section>
                <div className={styles.heading}>
                    <div className={styles.heading__number}>
                        <p>1</p>
                    </div>
                    <h2 aria-label='Foundation' className={styles.heading__text}>Foundation</h2>
                    <div className="done">
                        {foundationComplete && <img src={checkmark} alt="checkmark" />}
                    </div>
                </div>
                <div className={styles.steps}>
                    {
                        startupFoundationData?.map((val, id) => (

                        <div className={styles.steps__items} key={id}>
                            <input
                                type="checkbox"
                                id={`foundation-${id}`}
                                defaultChecked={val.check}
                                onChange={() => toggleCheckboxChange('foundation', !val.check , val.id) }
                            />
                            <label htmlFor="step">{ val.text }</label>
                        </div>
                        ))
                    }
                </div>
            </section>
            <section>
                <div className={styles.heading}>
                    <div className={styles.heading__number}>
                        <p>2</p>
                    </div>
                    <h2 aria-label='Foundation' className={styles.heading__text}>Discovery</h2>
                    <div className="done">
                        { discoveryComplete && <img src={checkmark} alt="checkmark" />}
                    </div>
                </div>
                <div className={styles.steps}>
                    {
                        startupDiscoveryData?.map((val, id) => (

                        <div className={styles.steps__items} key={id}>
                            <input
                                type="checkbox"
                                id={`discovery-${id}`}
                                defaultChecked={val.check}
                                onChange={() => toggleCheckboxChange('discovery', !val.check, val.id) }
                            />
                            <label htmlFor="step">{ val.text }</label>
                        </div>
                        ))
                    }
                </div>
            </section>
            <section>
                <div className={styles.heading}>
                    <div className={styles.heading__number}>
                        <p>3</p>
                    </div>
                    <h2 aria-label='Foundation' className={styles.heading__text}>Delivery</h2>
                    <div className="done">
                        {deliveryComplete && <img src={checkmark} alt="checkmark" />}
                    </div>
                </div>
                <div className={styles.steps}>
                    {
                        startupDeliveryData?.map((val, id) => (

                        <div className={styles.steps__items} key={id}>
                            <input
                                type="checkbox"
                                id={`delivery-${id}`}
                                defaultChecked={val.check}
                                onChange={() => toggleCheckboxChange('delivery', !val.check, val.id) }
                            />
                            <label htmlFor="step">{ val.text }</label>
                        </div>
                        ))
                    }
                </div>
            </section>

            <section className="random__fact">
                {randomFact && <h4>Random Fact: { randomFact }</h4>}
            </section>
        </div>
    );
};

export default View;