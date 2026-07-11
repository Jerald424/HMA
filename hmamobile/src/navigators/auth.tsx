import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'src/hooks/useTheme';
import AttendanceList from 'src/screens/attendanceList';
import Dashboard from 'src/screens/dashboard';
import DocumentsDetail from 'src/screens/documents/details';
import DocumentsList from 'src/screens/documents/list';
import ExpenseDetail from 'src/screens/expenses/detail';
import ExpensesList from 'src/screens/expenses/list';
import Landing from 'src/screens/landing';
import LeaveCreate from 'src/screens/leave/create';
import LeaveList from 'src/screens/leave/list';
import Map from 'src/screens/map';
import Notifications from 'src/screens/notifications/list';
import PayslipList from 'src/screens/payslip';
import PayslipDetail from 'src/screens/payslip/detail';
import ProfileEdit from 'src/screens/profileEdit';
import BankEdit from 'src/screens/profileEdit/bank';
import PersonalEdit from 'src/screens/profileEdit/personal';
import RequestCreate from 'src/screens/request/create';
import RequestList from 'src/screens/request/list';
import TestScreen from 'src/screens/TestScreen';
import fonts from 'src/utils/fonts';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.background,
          fontFamily: fonts.title,
        },
        headerTintColor: colors.background,
      }}
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AttendanceList"
        component={AttendanceList}
        options={{ title: 'Attendance List' }}
      />

      <Stack.Screen
        name="TestScreen"
        component={TestScreen}
        options={{ title: 'TestScreen' }}
      />
      <Stack.Screen
        name="Leave"
        component={LeaveList}
        options={{ title: 'Leave' }}
      />
      <Stack.Screen
        name="Payslip"
        component={PayslipList}
        options={{ title: 'Payslip' }}
      />
      <Stack.Screen
        name="Payslip Detail"
        component={PayslipDetail}
        options={{ title: 'Payslip Detail' }}
      />
      <Stack.Screen
        name="Leave Detail"
        component={LeaveCreate}
        options={{ title: 'Leave Detail' }}
      />
      <Stack.Screen
        name="Documents"
        component={DocumentsList}
        options={{ title: 'Documents' }}
      />
      <Stack.Screen
        name="Documents Detail"
        component={DocumentsDetail}
        options={{ title: 'Documents Detail' }}
      />
      <Stack.Screen
        name="Requests"
        component={RequestList}
        options={{ title: 'Requests' }}
      />
      <Stack.Screen
        name="Request Create"
        component={RequestCreate}
        options={{ title: 'Request Create' }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="Expenses"
        component={ExpensesList}
        options={{ title: 'Expenses' }}
      />
      <Stack.Screen
        name="Expense Detail"
        component={ExpenseDetail}
        options={{ title: 'Expense Detail' }}
      />
      <Stack.Screen
        name="Profile Edit"
        component={ProfileEdit}
        options={{ title: 'Profile Edit' }}
      />
      <Stack.Screen
        name="Personal Edit"
        component={PersonalEdit}
        options={{ title: 'Personal Edit' }}
      />
      <Stack.Screen
        name="Bank Edit"
        component={BankEdit}
        options={{ title: 'Bank Edit' }}
      />
    </Stack.Navigator>
  );
}
