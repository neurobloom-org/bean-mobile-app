import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

const TasksScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Hydrate: 1L Water',
      category: 'Health',
      subcategory: 'Low Energy',
      completed: false,
    },
    {
      id: 2,
      title: '10-minute mindfulness',
      category: 'Wellness',
      subcategory: 'Meditation',
      completed: false,
    },
    {
      id: 3,
      title: 'Make the bed',
      category: 'Routine',
      subcategory: 'Done',
      completed: true,
    },
  ]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Morning Vitamins',
      time: '8:00 AM',
      details: '2 capsules',
      taken: false,
    },
    {
      id: 2,
      name: 'SSRI Medication',
      time: 'Done at 6:15 AM',
      details: '',
      taken: true,
    },
  ]);

  const dayStreak = 5;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const takeMedication = (id: number) => {
    setMedications(
      medications.map(med => (med.id === id ? { ...med, taken: true } : med)),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F9F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Focus</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakMessage}>
              Keep it up, you're doing great!
            </Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakNumber}>{dayStreak}</Text>
              <Text style={styles.streakLabel}>day streak</Text>
            </View>
          </View>
          <View style={styles.fireIconContainer}>
            <Text style={styles.fireIcon}>🔥</Text>
          </View>
        </View>

        {/* Daily Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>Daily Progress</Text>
            <Text style={styles.progressText}>
              {completedTasks} of {totalTasks} completed
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(completedTasks / totalTasks) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Medication Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication Reminders</Text>
          {medications.map(med => (
            <View
              key={med.id}
              style={[
                styles.medicationCard,
                med.taken && styles.medicationCardDone,
              ]}
            >
              <View style={styles.medicationLeft}>
                <View
                  style={[
                    styles.medicationIcon,
                    med.taken && styles.medicationIconDone,
                  ]}
                >
                  <Text style={styles.pillIcon}>{med.taken ? '✓' : '💊'}</Text>
                </View>
                <View style={styles.medicationInfo}>
                  <Text
                    style={[
                      styles.medicationName,
                      med.taken && styles.medicationNameDone,
                    ]}
                  >
                    {med.name}
                  </Text>
                  <Text style={styles.medicationTime}>
                    {med.time}
                    {med.details ? ` • ${med.details}` : ''}
                  </Text>
                </View>
              </View>
              {!med.taken && (
                <TouchableOpacity
                  style={styles.takeButton}
                  onPress={() => takeMedication(med.id)}
                >
                  <Text style={styles.takeButtonText}>Take</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {tasks.map(task => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              onPress={() => toggleTask(task.id)}
            >
              <View style={styles.taskLeft}>
                <View
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkboxChecked,
                  ]}
                >
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text style={styles.taskCategory}>
                    {task.category} • {task.subcategory}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Task Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Bean Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "One step at a time is still moving forward. You're doing great
            today!"
          </Text>
          <Text style={styles.quoteAuthor}>— BEAN</Text>
        </View>

        {/* Extra padding for scroll */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIconInactive}>⌂</Text>
          <Text style={styles.navLabelInactive}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>✓</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Games')}
        >
          <Text style={styles.navIconInactive}>◆</Text>
          <Text style={styles.navLabelInactive}>Bean</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIconInactive}>◉</Text>
          <Text style={styles.navLabelInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F0F9F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  streakLeft: {
    flex: 1,
  },
  streakMessage: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
    marginRight: 6,
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  fireIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireIcon: {
    fontSize: 32,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  medicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medicationCardDone: {
    backgroundColor: '#F5F5F5',
  },
  medicationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF9C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationIconDone: {
    backgroundColor: '#E8F5E9',
  },
  pillIcon: {
    fontSize: 24,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicationNameDone: {
    color: '#999',
  },
  medicationTime: {
    fontSize: 13,
    color: '#666',
  },
  takeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  takeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskCategory: {
    fontSize: 13,
    color: '#666',
  },
  moreIcon: {
    fontSize: 20,
    color: '#999',
    paddingHorizontal: 8,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 24,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  quoteText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textAlign: 'right',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navIconActive: {
    fontSize: 26,
    marginBottom: 2,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  navIconInactive: {
    fontSize: 26,
    marginBottom: 2,
    color: '#9E9E9E',
  },
  navLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  navLabelInactive: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
});

export default TasksScreen;
