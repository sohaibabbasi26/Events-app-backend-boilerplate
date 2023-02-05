

module.exports = function AuthMediator(opts) {

    const {
        svcTalos
    } = opts;


    async function test({ number, service }) {
        let account = 'hello';

      //  number = sanitizePhoneNumber({ phone: number });

        account = await svcTalos.getFromDB({ phone: number });
        return account;
    }
    async function getRandomEvents(){
        result = await svcTalos.getRandomEvents();
        return result;
    }
    async function getEventData(id){

        result = await svcTalos.getEventData(id);
        return result;
    }
    async function  getEventsWithLocation(id){
        result = await svcTalos. getEventsWithLocation(id);
        return result;

    }

    async function eventAds(city){

        tablename = city.replace(
            /[\(\)-\s\&\'\"\$\@\#\%\^\,\.\!\_\|\=\?\:\;]+/g,
            ""
          );

          result = await svcTalos.eventAds(tablename)

          return result


    }


    return {
        getRandomEvents,
        getEventData,
        test,
        eventAds
        getEventsWithLocation
    }
}