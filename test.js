const ZKLib = require('./zklib')
const test = async () => {
    const zkInstance = new ZKLib('10.0.0.112', 4370, 10000, 4000);
    try {
        await zkInstance.createSocket();
        console.log("Get Attendance");
        
        // Get general info like logCapacity, user counts, logs count etc
        console.log(await zkInstance.getInfo());

        // zkInstance.connectTCP();
        await zkInstance.enableDevice();
        await zkInstance.getRealTimeLogs((data)=>{
            // do something when some checkin 
            console.log("Event");
            console.log(data)
        })
    } catch (err) {
        console.log("Error");
        console.log(err);
    }
}

test();