// src/screens/user/TasksScreen.tsx
// ✅ REFACTORED VERSION

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { BackButton, PrimaryButton } from '../../components';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';

interface Task {
  id: number;
  title: string;
  category: 'personal' | 'medication' | 'routine';
  completed: boolean;
  time?: string;
}

const TasksScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Morning meditation',
      category: 'routine',
      completed: true,
      time: '7:00 AM',
    },
    {
      id: 2,
      title: 'Take vitamins',
      category: 'medication',
      completed: false,
      time: '8:00 AM',
    },
    {
      id: 3,
      title: 'Journal entry',
      category: 'personal',
      completed: false,
      time: '9:00 PM',
    },
    {
      id: 4,
      title: 'Evening walk',
      category: 'routine',
      completed: false,
      time: '6:00 PM',
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = () => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    const task: Task = {
      id: tasks.length + 1,
      title: newTask,
      category: 'personal',
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setShowAddTask(false);
  };

  const deleteTask = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        },
      },
    ]);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medication':
        return COLORS.ERROR;
      case 'routine':
        return COLORS.PRIMARY;
      default:
        return COLORS.INFO;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BackButton />

        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>Stay organized and on track</Text>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressNumber}>
              {completedCount}/{totalCount}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress === 100
              ? '🎉 All tasks completed!'
              : `${Math.round(progress)}% complete`}
          </Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View>
            <Text style={styles.streakNumber}>7 Day Streak</Text>
            <Text style={styles.streakText}>Keep it up!</Text>
          </View>
        </View>

        {/* Tasks List */}
        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>Tasks</Text>

          {tasks.map(task => (
            <View key={task.id} style={styles.taskCard}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTask(task.id)}
              >
                <View
                  style={[
                    styles.checkboxInner,
                    task.completed && styles.checkboxChecked,
                  ]}
                >
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>

              <View style={styles.taskContent}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleCompleted,
                  ]}
                >
                  {task.title}
                </Text>
                {task.time && (
                  <Text style={styles.taskTime}>⏰ {task.time}</Text>
                )}
              </View>

              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(task.category) },
                ]}
              >
                <Text style={styles.categoryText}>{task.category}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Add Task Section */}
        {showAddTask ? (
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.addTaskInput}
              placeholder="Enter new task..."
              value={newTask}
              onChangeText={setNewTask}
              autoFocus
            />
            <View style={styles.addTaskButtons}>
              <PrimaryButton
                title="Add"
                onPress={addTask}
                variant="primary"
                size="medium"
              />
              <PrimaryButton
                title="Cancel"
                onPress={() => {
                  setShowAddTask(false);
                  setNewTask('');
                }}
                variant="outline"
                size="medium"
              />
            </View>
          </View>
        ) : (
          <PrimaryButton
            title="+ Add New Task"
            onPress={() => setShowAddTask(true)}
            variant="outline"
            size="large"
            fullWidth
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.XL,
    paddingTop: SPACING.XL,
    paddingBottom: SPACING.XXL,
  },
  title: {
    ...TYPOGRAPHY.H1,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XL,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXL,
  },
  progressCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.XL,
    marginBottom: SPACING.LG,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  progressTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },
  progressNumber: {
    ...TYPOGRAPHY.H3,
    color: COLORS.PRIMARY,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 6,
    marginBottom: SPACING.SM,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 6,
  },
  progressText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SUCCESS_LIGHT,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.XL,
    gap: SPACING.LG,
  },
  streakEmoji: {
    fontSize: 40,
  },
  streakNumber: {
    ...TYPOGRAPHY.H3,
    color: COLORS.SUCCESS,
  },
  streakText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  tasksSection: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.MD,
    gap: SPACING.MD,
  },
  checkbox: {
    padding: SPACING.XS,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.GRAY_400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    ...TYPOGRAPHY.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.TEXT_TERTIARY,
  },
  taskTime: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XXS,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XXS,
    borderRadius: SPACING.SM,
  },
  categoryText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: '600',
  },
  deleteButton: {
    padding: SPACING.XS,
  },
  deleteIcon: {
    fontSize: 18,
  },
  addTaskContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.LG,
    padding: SPACING.LG,
  },
  addTaskInput: {
    ...TYPOGRAPHY.BODY,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: SPACING.MD,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  addTaskButtons: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
});

export default TasksScreen;
