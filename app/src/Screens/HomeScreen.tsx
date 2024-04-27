import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { cities } from '../constants';
import Geolocation from 'react-native-geolocation-service';
import CategorySlider from '../components/Categories/CategorySlider';
import useAuthStore from '../store/authStore';

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [location, setLocation] = useState<any>(null);
  const navigate = useNavigation();
  const [data, setShops] = useState<any>([]);
  const [prods, setProds] = useState<any>([]);
  const { setCountry, setCity, setLocation, setLocationName, locationName } = useAuthStore();
  useEffect(() => {
    handleFetchData();
    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords.latitude, position.coords.longitude);
        getLocationName(position.coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show it on the map.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };
  const getLocationName = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`
      );
      const address = response.data.results[0].formatted_address;
      const cityComp = response.data.results[0].address_components.find((component: any) => component.types.includes('administrative_area_level_2'));
      const countryComp = response.data.results[0].address_components.find((component: any) => component.types.includes('country'));
      setCountry(countryComp.long_name)
      setCity(cityComp.long_name)
      setLocationName(address);
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  const handleFetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://www.evendo.pk/api/items');
      setProds(res.data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleFetchShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://www.evendo.pk/api/shop');
      setShops(res.data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleFetchData = async () => {
    setLoading(true);
    await handleFetchProducts();
    await handleFetchShops();
    setLoading(false);
  };

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.substring(0, n - 1) + '...' : str;
  };

  const groupProductsInRows = (products: any) => {
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
      rows.push([products[i], products[i + 1] ? products[i + 1] : null]);
    }
    return rows;
  };

  const productRows = groupProductsInRows(prods);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleFetchData} />
        }
        style={{
          padding: 12,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
          }}>
          Cities
        </Text>
        <FlatList
          data={cities}
          keyExtractor={item => item.name}
          horizontal
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  navigate.navigate('cityScreen', { city: item.name });
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#f4f4f4',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    {truncate(item.name, 14)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{ paddingVertical: 10, paddingHorizontal: 18, marginBottom: 7, backgroundColor: "#be35be20", borderRadius: 8, display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
          <Icon name="location-dot" size={18} color="#1a1a1a" />
          <Text style={{ fontSize: 14, fontWeight: "500", paddingHorizontal: 10, overflow: "hidden", flexWrap: "nowrap" }}>{locationName}</Text>
        </View>
        <CategorySlider />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
          }}>
          Shops
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'gray',
          }}>
          Find new shops to explore
        </Text>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{
              marginTop: 20,
            }}
          />
        )}
        {!loading && (
          <FlatList
            data={data}
            keyExtractor={item => item._id}
            horizontal
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#f4f4f4',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{ uri: item.logo }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    {truncate(item.name, 14)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'gray',
                    }}>
                    {truncate(item.address, 14)}
                  </Text>
                </View>
              );
            }}
          />
        )}
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
          }}>
          Products
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'gray',
          }}>
          Find new products on the go
        </Text>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{
              marginTop: 20,
            }}
          />
        )}
        {!loading && prods.length === 0 && (
          <Text
            style={{
              fontSize: 16,
              color: 'gray',
              marginTop: 20,
              textAlign: 'center',
            }}>
            No products found
          </Text>
        )}

        {!loading &&
          productRows.length > 0 &&
          productRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(
                (item, itemIndex) =>
                  item && (
                    <TouchableOpacity
                      onPress={() => {
                        //@ts-ignore
                        navigate.navigate('ProductDetails', { item });
                      }}
                      key={item._id}
                      style={styles.productContainer}>
                      <Image
                        source={{ uri: item.images[0] }}
                        style={styles.productImage}
                      />
                      <Text style={styles.productTitle}>
                        {truncate(item.title, 17)}
                      </Text>
                      <Text style={styles.productContent}>
                        {truncate(item.content, 19)}
                      </Text>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productContainer: {
    maxWidth: '48%',
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    flex: 1,
    margin: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  productContent: {
    fontSize: 14,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});
