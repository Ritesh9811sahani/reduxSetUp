import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
  Keyboard,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTaskStatus,
  deleteTask,
  setFilter,
} from '../../redux/Slices/taskSlice';

const Home = () => {
  const [taskName, setTaskName] = useState('');
  const dispatch = useDispatch();

  // Redux states
  const tasks = useSelector((state) => state.task.tasks) || [];
  const currentFilter = useSelector((state) => state.task.filter) || 'all';

  // Handler for adding a task
  const handleAddTask = () => {
    if (!taskName.trim()) {
      Alert.alert('Empty Task', 'Please enter a task name before adding.');
      return;
    }
    dispatch(addTask(taskName.trim()));
    setTaskName('');
    Keyboard.dismiss();
  };

  // Filter tasks based on current filter state
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === 'pending') {
      return task.status === 'pending';
    }
    if (currentFilter === 'done') {
      return task.status === 'done';
    }
    return true;
  });

  // Calculate task counts
  const allCount = tasks.length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const renderTaskItem = ({ item }) => {
    const isCompleted = item.status === 'done';

    return (
      <View style={styles.taskCard}>
        {/* Status Checkbox Button */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          activeOpacity={0.7}
          onPress={() => dispatch(toggleTaskStatus(item.id))}
        >
          <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
            {isCompleted && <Text style={styles.checkboxTick}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* Task Name and Status Info */}
        <View style={styles.taskInfo}>
          <Text style={[styles.taskText, isCompleted && styles.taskTextDone]}>
            {item.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              isCompleted ? styles.statusBadgeDone : styles.statusBadgePending,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isCompleted ? styles.statusBadgeTextDone : styles.statusBadgeTextPending,
              ]}
            >
              {isCompleted ? 'Done' : 'Pending'}
            </Text>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              'Delete Task',
              `Are you sure you want to delete "${item.name}"?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => dispatch(deleteTask(item.id)),
                },
              ]
            );
          }}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Tracker</Text>
        <Text style={styles.headerSubtitle}>Keep track of your daily tasks</Text>
      </View>

      {/* Task Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#94A3B8"
          value={taskName}
          onChangeText={setTaskName}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs Section */}
      <View style={styles.filterWrapper}>
        <View style={styles.filterContainer}>
          {/* All Filter */}
          <TouchableOpacity
            style={[styles.filterTab, currentFilter === 'all' && styles.filterTabActive]}
            activeOpacity={0.7}
            onPress={() => dispatch(setFilter('all'))}
          >
            <Text
              style={[
                styles.filterTabText,
                currentFilter === 'all' && styles.filterTabTextActive,
              ]}
            >
              All ({allCount})
            </Text>
          </TouchableOpacity>

          {/* Pending Filter */}
          <TouchableOpacity
            style={[styles.filterTab, currentFilter === 'pending' && styles.filterTabActive]}
            activeOpacity={0.7}
            onPress={() => dispatch(setFilter('pending'))}
          >
            <Text
              style={[
                styles.filterTabText,
                currentFilter === 'pending' && styles.filterTabTextActive,
              ]}
            >
              Pending ({pendingCount})
            </Text>
          </TouchableOpacity>

          {/* Done Filter */}
          <TouchableOpacity
            style={[styles.filterTab, currentFilter === 'done' && styles.filterTabActive]}
            activeOpacity={0.7}
            onPress={() => dispatch(setFilter('done'))}
          >
            <Text
              style={[
                styles.filterTabText,
                currentFilter === 'done' && styles.filterTabTextActive,
              ]}
            >
              Done ({doneCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>No Tasks Found</Text>
            <Text style={styles.emptySubtext}>
              {currentFilter === 'all'
                ? 'Type in the box above and press + to add your first task!'
                : `You don't have any ${currentFilter} tasks.`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#4F46E5', // Indigo Accent
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 32,
  },
  filterWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'space-between',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#4F46E5',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#10B981', // Emerald Green
    borderColor: '#10B981',
  },
  checkboxTick: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  taskTextDone: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  statusBadgePending: {
    backgroundColor: '#FEF3C7', // Amber light
  },
  statusBadgeDone: {
    backgroundColor: '#D1FAE5', // Emerald light
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadgeTextPending: {
    color: '#D97706', // Amber dark
  },
  statusBadgeTextDone: {
    color: '#059669', // Emerald dark
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FEE2E2', // Red light
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#475569',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
  },
});