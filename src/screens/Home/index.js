import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {TransactionsList} from '../../lib/constants/transactions';
import {
  ListSeparator,
  ListHeader,
  ListFooter,
  TransactionItem,
} from '../../components';
import {Colors} from '../../assets/theme/colors';

const HomeScreen = () => {
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Order list by date from old to new
    const orderedTransactionsList = TransactionsList?.map(obj => {
      return {...obj, date: new Date(obj.dueDate)};
    }).sort((a, b) => a.date - b.date);
    setTotalTransactions(orderedTransactionsList);
    setVisibleTransactions(orderedTransactionsList.slice(0, 10));

    // Calculate total amount for all transactions
    const sum = TransactionsList?.reduce((prev, curr) => prev + curr.amount, 0);
    setTotalAmount(parseInt(sum));
  }, []);

  const fetchMoreData = () => {
    // Implement pagenation scenario
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (visibleTransactions.length !== totalTransactions.length) {
        setVisibleTransactions(prev => [
          ...prev,
          ...totalTransactions.slice(prev.length, prev.length + 10),
        ]);
      }
    }, 3000);
  };

  const selectedAmount = useMemo(() => {
    // Calculate total dues amount
    const amount = selectedItems?.reduce((prev, curr) => prev + curr.amount, 0);
    return parseInt(amount);
  }, [selectedItems]);

  const onSelectItem = id => {
    const selected = TransactionsList.find(item => item.id === id);
    const isFound = selectedItems.find(item => item.id === id);
    if (isFound) {
      if (checkSelectionAvailability(id).ableToUnSelect) {
        const filteredItems = selectedItems.filter(item => item.id !== id);
        setSelectedItems(filteredItems);
      }
    } else {
      const {ableToSelect} = checkSelectionAvailability(id);
      if (ableToSelect) {
        setSelectedItems(prev => [...prev, selected]);
      }
    }
  };

  const checkSelectionAvailability = id => {
    // Validate Item sould be selected in order
    const selected = TransactionsList.find(item => item.id === id);
    const indexOfCurrent = totalTransactions.findIndex(
      item => item.id == selected.id,
    );
    const ableToSelect = indexOfCurrent <= selectedItems.length;
    const ableToUnSelect = indexOfCurrent == selectedItems.length - 1;

    return {ableToSelect, ableToUnSelect};
  };

  const renderRow = ({item}) => {
    return (
      <TransactionItem
        key={item.id}
        accoundId={item.id}
        amount={item.amount}
        dueDate={item.dueDate}
        accountId={item.accountId}
        toggleAvailability={() => checkSelectionAvailability(item.id)}
        onSelect={() => onSelectItem(item.id)}
      />
    );
  };

  const renderFooter = () => {
    return (
      visibleTransactions.length !== totalTransactions.length && (
        <ListFooter loading={loading} onPress={fetchMoreData} />
      )
    );
  };

  const renderListHeader = () => {
    return (
      <ListHeader totalAmount={totalAmount} selectedAmount={selectedAmount} />
    );
  };
  const keyExtractor = useCallback(item => item.id, []);

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.wrapper}>
        <FlatList
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ItemSeparatorComponent={<ListSeparator />}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          stickyHeaderHiddenOnScroll={true}
          stickyHeaderIndices={[0]}
          data={visibleTransactions ?? []}
          contentContainerStyle={{padding: 12}}
          renderItem={renderRow}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
