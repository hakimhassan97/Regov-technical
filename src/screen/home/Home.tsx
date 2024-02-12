import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';
import { AuthContext } from '../../common/context/auth-context';
import DropDownInput from '../../common/dropdown-input';
import { Props } from '../../common/props';
import Provider from '../../provider/provider';
import Styles from '../../utils/styles';
import utils from '../../utils/utils';

interface HomeProps extends Props {}

const HomeScreen = ({route, navigation}: HomeProps) => {
  const {logout} = useContext(AuthContext);
  const screenWidth = Dimensions.get('window').width;
  const [shownData, setShownData] = useState<any>();
  const [countriesArray, setCountriesArray] = useState<string[]>([]);
  const [activeCountry, setActiveCountry] = useState<string>();

  useEffect(() => {
    utils.countriesArray().then(countries => setCountriesArray(countries));
  }, []);

  const fetchCovidData = useCallback(async (country: string) => {
    const countryCovidCases = await Provider.getCountryCovidCases(country);
    const countryCovidDeaths = await Provider.getCountryCovidDeaths(country);
    setShownData({countryCovidCases, countryCovidDeaths});
  }, []);

  const countriesOnChange = useCallback((country: any) => {
    setActiveCountry(country?.value);
    fetchCovidData(country?.value);
  }, []);

  const cases = shownData?.countryCovidCases[0]?.cases || [];
  const deaths = shownData?.countryCovidDeaths[0]?.deaths || [];

  let highestCases = 0;
  const casesData = {
    labels: Object.keys(cases),
    datasets: [
      {
        data: Object.keys(cases).map(item => {
          const count = cases[item]?.new;
          if (count > highestCases) {
            highestCases = count;
          }
          return count;
        }),
      },
      {
        data: Object.keys(deaths).map(item => {
          const count = deaths[item]?.new;
          return count;
        }),
      },
    ],
  };
  return (
    <>
      <View style={{display:'flex', justifyContent:'flex-end', flexDirection:'row', padding:10}}>
        <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
      </View>
      <View style={Styles.body}>
        {countriesArray.length > 1 ? (
          <DropDownInput
            title="Country"
            data={countriesArray || []}
            onChange={countriesOnChange}
          />
        ) : (
          <ActivityIndicator />
        )}
        <View style={Styles.container}>
          {shownData && (
            <>
              <ScrollView horizontal>
                <LineChart
                  data={casesData}
                  width={screenWidth * 100}
                  height={256}
                  verticalLabelRotation={30}
                  chartConfig={chartConfig}
                  bezier
                />
              </ScrollView>
              <View style={[{backgroundColor: 'white'}]}>
                <FlatList
                  data={casesData?.labels}
                  renderItem={({item, index}) => {
                    const caseCount = casesData?.datasets[0].data[index];
                    const deathCount = casesData?.datasets[1].data[index];
                    return (
                      <>
                        {index === 0 && (
                          <View
                            style={[
                              {
                                width: '100%',
                                height: 20,
                                display: 'flex',
                                flexDirection: 'row',
                              },
                            ]}>
                            <View
                              style={{width: '30%', backgroundColor: 'grey'}}>
                              <Text>Date</Text>
                            </View>
                            <View style={{width: '35%'}}>
                              {/* <View style={{backgroundColor:'green',height:20, width: `${(caseCount>0?caseCount:0)/highestCases*100}%`}}/> */}
                              <Text style={{position: 'absolute'}}>
                                Number of cases
                              </Text>
                            </View>
                            <View style={{width: '35%'}}>
                              {/* <View style={{backgroundColor:'green',height:20, width: `${(caseCount>0?caseCount:0)/highestCases*100}%`}}/> */}
                              <Text style={{position: 'absolute'}}>
                                Number of deaths
                              </Text>
                            </View>
                          </View>
                        )}
                        <View
                          style={[
                            {
                              width: '100%',
                              height: 20,
                              display: 'flex',
                              flexDirection: 'row',
                            },
                          ]}>
                          <View style={{width: '30%', backgroundColor: 'grey'}}>
                            <Text>{item}</Text>
                          </View>
                          <View style={[{width: '70%'}]}>
                            <View
                              style={{
                                backgroundColor: 'green',
                                height: 20,
                                width: `${
                                  ((caseCount > 0 ? caseCount : 0) /
                                    highestCases) *
                                  100
                                }%`,
                              }}
                            />
                            <View style={{position:'absolute'}}>
                            <View style={{width: '50%'}}>
                              <Text style={{position: 'absolute'}}>
                                {caseCount}
                              </Text>
                            </View>
                            <View style={{width: '50%'}}>
                              <Text style={{}}>{deathCount}</Text>
                            </View>
                            </View>
                          </View>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            </>
          )}

        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `black`, //`rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
