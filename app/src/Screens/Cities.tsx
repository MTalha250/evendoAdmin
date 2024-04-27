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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/authStore';
import { cities } from '../constants';


// @ts-ignore
const Cities = ({ route }) => {
  const { user } = useAuthStore();
  const { city } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigation();
  useEffect(() => {
    handleFetchData();
  }, []);

  const [data, setShops] = useState<any>([]);

  const [prods, setProds] = useState<any>([]);

  const handleFetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://www.evendo.pk/api/city/${city}`);
      setProds(res.data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
  };

  const handleFetchData = async () => {
    setLoading(true);
    await handleFetchProducts();
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
          Products
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'gray',
          }}>
          Find new products in {city}
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
    </SafeAreaView>
  );
};

export default Cities;

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
