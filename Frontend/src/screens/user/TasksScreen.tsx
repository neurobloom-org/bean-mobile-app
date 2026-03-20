// src/screens/user/TasksScreen.tsx
// ✅ FIGMA-MATCHED — Streak · Progress · Medication Reminders · Tasks · Quote

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
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import BottomTabBar from '../../components/navigation/BottomTabBar';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
}

interface Medication {
  id: number;
  title: string;
  time: string;
  dose: string;
  taken: boolean;
}

// ─── Screen ───────────────────────────────────────────────────────────────────
const TasksScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Hydrate: 1L Water', category: 'Health', completed: false },
    {
      id: 2,
      title: '10-minute mindfulness',
      category: 'Wellness • Meditation',
      completed: false,
    },
    { id: 3, title: 'Make-the-bed', category: 'Routine', completed: false },
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      title: 'Morning Vitamins',
      time: '8:00 AM',
      dose: '2 capsules',
      taken: false,
    },
    {
      id: 2,
      title: 'SSRI Medication',
      time: '8:15 AM',
      dose: 'Done at 8:15 AM',
      taken: false,
    },
  ]);

  const [newTask, setNewTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const STREAK = 0;
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const toggleTask = (id: number) =>
    setTasks(
      tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const toggleMedication = (id: number) =>
    setMedications(
      medications.map(m => (m.id === id ? { ...m, taken: !m.taken } : m)),
    );

  const deleteTask = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks(tasks.filter(t => t.id !== id)),
      },
    ]);
  };

  const addTask = () => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        category: 'Personal',
        completed: false,
      },
    ]);
    setNewTask('');
    setShowAddTask(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Focus</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakGlow} />
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakNumber}>{STREAK}</Text>
          <Text style={styles.streakLabel}>CURRENT STREAK!</Text>
        </View>

        {/* Daily Progress */}
        <View style={styles.progressRow}>
          <Text style={styles.progressTitle}>Daily Progress</Text>
          <Text style={styles.progressCount}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        {/* Medication Reminders */}
        <Text style={styles.sectionTitle}>Medication Reminders</Text>
        {medications.map(med => (
          <View key={med.id} style={styles.medCard}>
            <View
              style={[
                styles.medIconCircle,
                med.taken && styles.medIconCircleDone,
              ]}
            >
              <Text style={styles.medIconText}>💊</Text>
            </View>
            <View style={styles.medContent}>
              <Text style={styles.medTitle}>{med.title}</Text>
              <Text style={styles.medSub}>
                {med.time} • {med.dose}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.takeBtn, med.taken && styles.takeBtnDone]}
              onPress={() => toggleMedication(med.id)}
            >
              <Text style={styles.takeBtnText}>
                {med.taken ? 'Done' : 'Take'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Today's Tasks */}
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskCard}>
            <TouchableOpacity
              onPress={() => toggleTask(task.id)}
              style={styles.checkboxHit}
            >
              <View
                style={[styles.checkbox, task.completed && styles.checkboxDone]}
              >
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text
                style={[styles.taskTitle, task.completed && styles.taskDone]}
              >
                {task.title}
              </Text>
              <Text style={styles.taskCategory}>{task.category}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteTask(task.id)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Task */}
        {showAddTask ? (
          <View style={styles.addBox}>
            <TextInput
              style={styles.addInput}
              placeholder="Enter new task..."
              placeholderTextColor={COLORS.TEXT_TERTIARY}
              value={newTask}
              onChangeText={setNewTask}
              autoFocus
            />
            <View style={styles.addBtnRow}>
              <TouchableOpacity style={styles.addConfirmBtn} onPress={addTask}>
                <Text style={styles.addConfirmText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addCancelBtn}
                onPress={() => {
                  setShowAddTask(false);
                  setNewTask('');
                }}
              >
                <Text style={styles.addCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setShowAddTask(true)}
          >
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
        )}

        {/* Quote */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "One step at a time is still moving forward.{'\n'}You're doing great
            today!"
          </Text>
          <Text style={styles.quoteAuthor}>— BEAN —</Text>
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Tasks" />
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 32,
  },
  headerTitle: {
    ...TYPOGRAPHY.H4,
    color: COLORS.TEXT_PRIMARY,
  },

  scroll: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },

  // ── Streak card
  streakCard: {
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.LG,
    backgroundColor: '#E8EDEA',
    overflow: 'hidden',
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  streakGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#C9F7E4',
    opacity: 0.75,
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    marginTop: 'auto' as any,
    marginBottom: 'auto' as any,
  },
  streakFlame: {
    fontSize: 44,
    marginBottom: SPACING.XS,
  },
  streakNumber: {
    fontSize: 52,
    fontWeight: '900' as const,
    color: '#0F172A',
    lineHeight: 58,
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#07882C',
    letterSpacing: 1.2,
    marginTop: SPACING.XS,
  },

  // ── Progress
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  progressCount: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 5,
    marginBottom: SPACING.XL,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
  },

  // ── Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },

  // ── Medication card
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.SECONDARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  medIconCircleDone: {
    backgroundColor: COLORS.SUCCESS_LIGHT,
  },
  medIconText: {
    fontSize: 20,
  },
  medContent: {
    flex: 1,
  },
  medTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  medSub: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  takeBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
  },
  takeBtnDone: {
    backgroundColor: COLORS.GRAY_200,
  },
  takeBtnText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
  },

  // ── Task card
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkboxHit: {
    padding: SPACING.XS,
    marginRight: SPACING.SM,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.GRAY_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: '700' as const,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: COLORS.TEXT_PRIMARY,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: COLORS.TEXT_TERTIARY,
  },
  taskCategory: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  deleteBtn: {
    padding: SPACING.XS,
  },
  deleteIcon: {
    fontSize: 16,
  },

  // ── FAB
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.MD,
    marginBottom: SPACING.LG,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.WHITE,
    lineHeight: 32,
    fontWeight: '300' as const,
  },

  // ── Add task box
  addBox: {
    backgroundColor: COLORS.WHITE,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
  },
  addInput: {
    ...TYPOGRAPHY.BODY,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  addBtnRow: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  addConfirmBtn: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  addConfirmText: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: COLORS.WHITE,
  },
  addCancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  addCancelText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: COLORS.TEXT_SECONDARY,
  },

  // ── Quote
  quoteBox: {
    marginTop: SPACING.SM,
    marginBottom: SPACING.MD,
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
  },
  quoteText: {
    ...TYPOGRAPHY.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: COLORS.PRIMARY,
    marginTop: SPACING.XS,
    letterSpacing: 1,
  },
});

export default TasksScreen;
