// src/screens/user/TasksScreen.tsx
// ✅ Dark theme aware

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
import { SPACING, TYPOGRAPHY } from '../../constants';
import { BORDER_RADIUS } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';
import BottomTabBar from '../../components/navigation/BottomTabBar';

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

const TasksScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme(); // ✅

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.BACKGROUND_LIGHT }]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.SURFACE,
            borderBottomColor: colors.BORDER_LIGHT,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={[styles.backIcon, { color: colors.TEXT_PRIMARY }]}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.TEXT_PRIMARY }]}>
          Today's Focus
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <View
          style={[
            styles.streakCard,
            { backgroundColor: isDark ? '#1A2A22' : '#E8EDEA' },
          ]}
        >
          <View
            style={[
              styles.streakGlow,
              { backgroundColor: isDark ? '#0D3A1F' : '#C9F7E4' },
            ]}
          />
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={[styles.streakNumber, { color: colors.TEXT_PRIMARY }]}>
            {STREAK}
          </Text>
          <Text style={styles.streakLabel}>CURRENT STREAK!</Text>
        </View>

        {/* Daily Progress */}
        <View style={styles.progressRow}>
          <Text style={[styles.progressTitle, { color: colors.TEXT_PRIMARY }]}>
            Daily Progress
          </Text>
          <Text
            style={[styles.progressCount, { color: colors.TEXT_SECONDARY }]}
          >
            {completedCount} of {totalCount} completed
          </Text>
        </View>
        <View
          style={[styles.progressBarBg, { backgroundColor: colors.BORDER }]}
        >
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%`, backgroundColor: colors.PRIMARY },
            ]}
          />
        </View>

        {/* Medication Reminders */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Medication Reminders
        </Text>
        {medications.map(med => (
          <View
            key={med.id}
            style={[styles.medCard, { backgroundColor: colors.SURFACE }]}
          >
            <View
              style={[
                styles.medIconCircle,
                { backgroundColor: colors.SECONDARY_LIGHT },
                med.taken && { backgroundColor: colors.SUCCESS_LIGHT },
              ]}
            >
              <Text style={styles.medIconText}>💊</Text>
            </View>
            <View style={styles.medContent}>
              <Text style={[styles.medTitle, { color: colors.TEXT_PRIMARY }]}>
                {med.title}
              </Text>
              <Text style={[styles.medSub, { color: colors.TEXT_SECONDARY }]}>
                {med.time} • {med.dose}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.takeBtn,
                { backgroundColor: colors.PRIMARY },
                med.taken && { backgroundColor: colors.BORDER },
              ]}
              onPress={() => toggleMedication(med.id)}
            >
              <Text style={[styles.takeBtnText, { color: colors.WHITE }]}>
                {med.taken ? 'Done' : 'Take'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Today's Tasks */}
        <Text style={[styles.sectionTitle, { color: colors.TEXT_PRIMARY }]}>
          Today's Tasks
        </Text>
        {tasks.map(task => (
          <View
            key={task.id}
            style={[styles.taskCard, { backgroundColor: colors.SURFACE }]}
          >
            <TouchableOpacity
              onPress={() => toggleTask(task.id)}
              style={styles.checkboxHit}
            >
              <View
                style={[
                  styles.checkbox,
                  { borderColor: colors.BORDER },
                  task.completed && {
                    backgroundColor: colors.PRIMARY,
                    borderColor: colors.PRIMARY,
                  },
                ]}
              >
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  { color: colors.TEXT_PRIMARY },
                  task.completed && {
                    textDecorationLine: 'line-through',
                    color: colors.TEXT_TERTIARY,
                  },
                ]}
              >
                {task.title}
              </Text>
              <Text
                style={[styles.taskCategory, { color: colors.TEXT_SECONDARY }]}
              >
                {task.category}
              </Text>
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
          <View style={[styles.addBox, { backgroundColor: colors.SURFACE }]}>
            <TextInput
              style={[
                styles.addInput,
                {
                  borderColor: colors.BORDER,
                  color: colors.TEXT_PRIMARY,
                  backgroundColor: colors.BACKGROUND_LIGHT,
                },
              ]}
              placeholder="Enter new task..."
              placeholderTextColor={colors.TEXT_TERTIARY}
              value={newTask}
              onChangeText={setNewTask}
              autoFocus
            />
            <View style={styles.addBtnRow}>
              <TouchableOpacity
                style={[
                  styles.addConfirmBtn,
                  { backgroundColor: colors.PRIMARY },
                ]}
                onPress={addTask}
              >
                <Text style={[styles.addConfirmText, { color: colors.WHITE }]}>
                  Add
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addCancelBtn, { borderColor: colors.BORDER }]}
                onPress={() => {
                  setShowAddTask(false);
                  setNewTask('');
                }}
              >
                <Text
                  style={[
                    styles.addCancelText,
                    { color: colors.TEXT_SECONDARY },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: colors.PRIMARY }]}
            onPress={() => setShowAddTask(true)}
          >
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
        )}

        {/* Quote */}
        <View style={styles.quoteBox}>
          <Text style={[styles.quoteText, { color: colors.TEXT_SECONDARY }]}>
            "One step at a time is still moving forward.{'\n'}You're doing great
            today!"
          </Text>
          <Text style={[styles.quoteAuthor, { color: colors.PRIMARY }]}>
            — BEAN —
          </Text>
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Tasks" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  backIcon: { fontSize: 28, lineHeight: 32 },
  headerTitle: { ...TYPOGRAPHY.H4 },
  scroll: {
    paddingHorizontal: SPACING.LG,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.MASSIVE,
  },
  streakCard: {
    borderRadius: BORDER_RADIUS.XL,
    paddingVertical: SPACING.XL,
    alignItems: 'center',
    marginBottom: SPACING.LG,
    overflow: 'hidden',
    elevation: 4,
  },
  streakGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.75,
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    marginTop: 'auto' as any,
    marginBottom: 'auto' as any,
  },
  streakFlame: { fontSize: 44, marginBottom: SPACING.XS },
  streakNumber: { fontSize: 52, fontWeight: '900' as const, lineHeight: 58 },
  streakLabel: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: '#07882C',
    letterSpacing: 1.2,
    marginTop: SPACING.XS,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  progressTitle: { fontSize: 15, fontWeight: '700' as const },
  progressCount: { ...TYPOGRAPHY.CAPTION },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    marginBottom: SPACING.XL,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 5 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: SPACING.MD,
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    elevation: 2,
  },
  medIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  medIconText: { fontSize: 20 },
  medContent: { flex: 1 },
  medTitle: { fontSize: 14, fontWeight: '700' as const },
  medSub: { ...TYPOGRAPHY.CAPTION, marginTop: 2 },
  takeBtn: {
    borderRadius: BORDER_RADIUS.ROUND,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XS,
  },
  takeBtnText: { fontSize: 13, fontWeight: '700' as const },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    elevation: 2,
  },
  checkboxHit: { padding: SPACING.XS, marginRight: SPACING.SM },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' as const },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 14, fontWeight: '600' as const },
  taskCategory: { ...TYPOGRAPHY.CAPTION, marginTop: 2 },
  deleteBtn: { padding: SPACING.XS },
  deleteIcon: { fontSize: 16 },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.MD,
    marginBottom: SPACING.LG,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    lineHeight: 32,
    fontWeight: '300' as const,
  },
  addBox: {
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
  },
  addInput: {
    ...TYPOGRAPHY.BODY,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
  },
  addBtnRow: { flexDirection: 'row', gap: SPACING.MD },
  addConfirmBtn: {
    flex: 1,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  addConfirmText: { fontSize: 15, fontWeight: '700' as const },
  addCancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.ROUND,
    paddingVertical: SPACING.MD,
    alignItems: 'center',
  },
  addCancelText: { fontSize: 15, fontWeight: '600' as const },
  quoteBox: {
    marginTop: SPACING.SM,
    marginBottom: SPACING.MD,
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
  },
  quoteText: {
    ...TYPOGRAPHY.BODY_SMALL,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 11,
    fontWeight: '700' as const,
    marginTop: SPACING.XS,
    letterSpacing: 1,
  },
});

export default TasksScreen;
