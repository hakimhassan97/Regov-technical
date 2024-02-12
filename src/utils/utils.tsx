import Provider from '../provider/provider';

const countriesArray = async () => {
  try {
    const dataToday = await Provider.getCovidByDate('2022-01-01');
    const arr = dataToday.map(item => item?.country);
    const countriesList = arr
      .filter((item, index) => arr.indexOf(item) === index)
      .map((item: any) => {
        return {
          label: item,
          value: item,
        };
      });

    console.log('kfdndwosifne :: ', countriesList);
    return countriesList;
  } catch (e) {
    return [];
  }
};


export default {countriesArray};
