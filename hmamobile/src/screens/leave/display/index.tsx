import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Container from 'src/components/styled/atoms/container';
import HMADivider from 'src/components/styled/atoms/divider';
import HMAText from 'src/components/styled/atoms/text';
import { blendWithWhite } from 'src/function/colorCorrection';
import { colors } from 'src/theme/colors';

type ApprovalStatus =
  | 'in_progress'
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'skipped';

interface ApprovalStep {
  step: number;
  name: string;
  status: ApprovalStatus;
  approvers: string[];
  acted_by: string | null;
  acted_at: string | null;
  comment: string;
}

interface LeaveItem {
  id: string;
  type: string;
  dates: string;
  days: number;
  status: ApprovalStatus;
  approver: string;
  start_date: string;
  end_date: string;
  reason: string;
  half_day: boolean;
  approval_process: {
    source: string;
    overall_status: ApprovalStatus;
    total_steps: number;
    completed_steps: number;
    current_step: number | null;
    current_step_name: string | null;
    pending_with: string[];
    steps: ApprovalStep[];
  };
}

// const leaveData: LeaveItem = {
//   id: 'LV-20261015-955',
//   type: 'Annual Leaves - BWP',
//   dates: 'Oct 15 – 20, 2026',
//   days: 6,
//   status: 'approved',
//   approver: 'Pamela Laxamana',
//   start_date: '2026-10-15',
//   end_date: '2026-10-20',
//   reason: 'Site closed due to local event',
//   half_day: false,
//   approval_process: {
//     source: 'tier_validation',
//     overall_status: 'approved',
//     total_steps: 4,
//     completed_steps: 4,
//     current_step: null,
//     current_step_name: null,
//     pending_with: [],
//     steps: [
//       {
//         step: 1,
//         name: 'Annual Leaves - Staff - 1st Approver (Pamela)',
//         status: 'approved',
//         approvers: ['Pamela Laxamana'],
//         acted_by: 'Pamela Laxamana',
//         acted_at: '2026-10-14 09:00:06',
//         comment: '',
//       },
//       {
//         step: 2,
//         name: 'Annual Leaves - Staff - 2nd Approver (Manager)',
//         status: 'skipped',
//         approvers: ['Emad Amer Khalil Faraj'],
//         acted_by: null,
//         acted_at: '2026-10-27 13:10:47',
//         comment: '',
//       },
//       {
//         step: 3,
//         name: 'Annual Leaves - Staff - 3rd Approver (Maria)',
//         status: 'approved',
//         approvers: ['Maria Harran'],
//         acted_by: 'Maria Harran',
//         acted_at: '2026-10-27 13:10:55',
//         comment: '',
//       },
//       {
//         step: 4,
//         name: 'Annual Leaves - Staff - 4th Approver (Pamela)',
//         status: 'approved',
//         approvers: ['Pamela Laxamana'],
//         acted_by: 'Pamela Laxamana',
//         acted_at: '2026-10-27 13:20:07',
//         comment: '',
//       },
//     ],
//   },
// };

const COLORS = {
  primary: colors.success,
  primaryDark: colors.success,
  successBg: blendWithWhite(colors.success, 0.9),
  successText: colors.success,
  skipped: blendWithWhite(colors.textSecondary, 0.5),
  skippedBg: blendWithWhite(colors.textSecondary, 0.9),
  rejected: colors.error,
  rejectedBg: blendWithWhite(colors.error, 0.9),
  pending: colors.warning,
  pendingBg: blendWithWhite(colors.warning, 0.9),
  background: colors.lightBackground,
  white: colors.background,
  text: colors.textPrimary,
  secondary: '#66738A',
  border: colors.border,
  lightGreen: blendWithWhite(colors.success, 0.95),
};

const getStatusColors = (status: ApprovalStatus) => {
  switch (status) {
    case 'approved':
      return {
        color: COLORS.successText,
        backgroundColor: COLORS.successBg,
        icon: '✓',
      };
    case 'rejected':
      return {
        color: COLORS.rejected,
        backgroundColor: COLORS.rejectedBg,
        icon: '✕',
      };
    case 'skipped':
      return {
        color: COLORS.skipped,
        backgroundColor: COLORS.skippedBg,
        icon: '−',
      };
    default:
      return {
        color: COLORS.pending,
        backgroundColor: COLORS.pendingBg,
        icon: '◷',
      };
  }
};

const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return null;

  const [date, time] = dateTime.split(' ');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');

  const hour = Number(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = String(hour % 12 || 12).padStart(2, '0');

  const monthName = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleString('en-US', { month: 'short' });

  return `${monthName} ${day}, ${year} • ${formattedHour}:${minutes} ${period}`;
};

// Status badge
const StatusBadge = ({ status }: { status: ApprovalStatus }) => {
  const colors = getStatusColors(status);

  return (
    <View
      style={[styles.statusBadge, { backgroundColor: colors.backgroundColor }]}
    >
      <HMAText size="xs" style={[{ color: colors.color }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </HMAText>
    </View>
  );
};

// Leave summary item
const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.summaryItem}>
    <View style={styles.summaryIcon}>
      <HMAText style={[]}>{icon}</HMAText>
    </View>

    <View style={{ flex: 1 }}>
      <HMAText size="small" style={[]}>
        {label}
      </HMAText>
      <HMAText color="textSecondary" style={[]}>
        {value}
      </HMAText>
    </View>
  </View>
);

// Approval timeline item
const ApprovalTimelineItem = ({
  item,
  isLast,
}: {
  item: ApprovalStep;
  isLast: boolean;
}) => {
  const colors = getStatusColors(item.status);
  const formattedDate = formatDateTime(item.acted_at);

  return (
    <View style={styles.timelineItem}>
      {/* Timeline indicator */}
      <View style={styles.timelineRail}>
        <View
          style={[styles.timelineCircle, { backgroundColor: colors.color }]}
        >
          <HMAText style={[]} color="background">
            {colors.icon}
          </HMAText>
        </View>

        {!isLast && (
          <View
            style={[
              styles.timelineLine,
              {
                backgroundColor:
                  item.status === 'approved' ? COLORS.primary : COLORS.border,
              },
            ]}
          />
        )}
      </View>

      {/* Approval content */}
      <View style={styles.timelineContent}>
        <View style={styles.timelineHeader}>
          <HMAText style={[{ color: colors.color }]}>Step {item.step}</HMAText>

          <StatusBadge status={item.status} />
        </View>

        <HMAText style={[]} size="small">
          {item.name}
        </HMAText>

        {item.status === 'approved' && item.acted_by && (
          <HMAText style={[]} size="regular" color="textSecondary">
            Approved by {item.acted_by}
          </HMAText>
        )}

        {item.status === 'skipped' && (
          <HMAText style={[]} size="regular" color="textSecondary">
            This approval step was skipped
          </HMAText>
        )}

        {item.status === 'rejected' && item.acted_by && (
          <HMAText style={[]} size="regular" color="textSecondary">
            Rejected by {item.acted_by}
          </HMAText>
        )}

        {item.status === 'pending' && (
          <HMAText
            style={[]}
            size="regular"
            color="textSecondary"
            // color="textSecondary"
          >
            Awaiting approval
            {item.approvers.length ? ` • ${item.approvers.join(', ')}` : ''}
          </HMAText>
        )}

        {formattedDate && (
          <View style={styles.dateRow}>
            <HMAText style={[]} size="small" color="textSecondary">
              ◷
            </HMAText>
            <HMAText style={[]} size="small" color="textSecondary">
              {formattedDate}
            </HMAText>
          </View>
        )}

        {!!item.comment && (
          <View style={styles.commentContainer}>
            <HMAText style={[]} size="small" color="textSecondary">
              Comment
            </HMAText>
            <HMAText style={[]} size="small">
              {item.comment}
            </HMAText>
          </View>
        )}
      </View>
    </View>
  );
};

// Main screen
const LeaveDisplayScreen = ({ route }) => {
  const leave = route?.params?.leave;
  const approval = leave.approval_process;

  const isApproved = approval.overall_status === 'approved';
  const isRejected = approval.overall_status === 'rejected';

  return (
    <Container>
      {/* <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        {/* <View style={styles.header}>
          <Text style={styles.backButton}>‹</Text>
          <Text style={styles.headerTitle}>Leave Details</Text>
          <Text style={styles.moreButton}>•••</Text>
        </View> */}

        {/* Overall status */}
        <View
          style={[
            styles.overallStatus,
            {
              backgroundColor: isApproved
                ? COLORS.lightGreen
                : isRejected
                ? COLORS.rejectedBg
                : COLORS.pendingBg,
            },
          ]}
        >
          <View
            style={[
              styles.overallStatusIcon,
              {
                backgroundColor: isApproved
                  ? COLORS.primary
                  : isRejected
                  ? COLORS.rejected
                  : COLORS.pending,
              },
            ]}
          >
            <HMAText style={[]} color="background" size="large">
              {isApproved ? '✓' : isRejected ? '✕' : '◷'}
            </HMAText>
          </View>

          <View style={{ flex: 1 }}>
            <HMAText
              size="title"
              style={[
                // styles.overallStatusTitle,
                {
                  color: isApproved
                    ? COLORS.successText
                    : isRejected
                    ? COLORS.rejected
                    : COLORS.pending,
                },
              ]}
            >
              {approval.overall_status.charAt(0).toUpperCase() +
                approval.overall_status.slice(1)}
            </HMAText>

            <HMAText style={[]} size="small" color="textSecondary">
              {isApproved
                ? 'Your leave request has been approved'
                : isRejected
                ? 'Your leave request has been rejected'
                : 'Your leave request is awaiting approval'}
            </HMAText>
          </View>

          <HMAText style={styles.calendarDecoration} color="info">
            ▦
          </HMAText>
        </View>

        {/* Leave information */}
        <View style={styles.card}>
          <View style={styles.leaveTitleRow}>
            <View style={styles.leaveIconContainer}>
              <Text style={styles.leaveIcon}>▣</Text>
            </View>

            <View style={{ flex: 1 }}>
              <HMAText style={[]}>{leave.type}</HMAText>
              <View style={styles.leaveIdBadge}>
                <HMAText style={[]} size="xs" color="textSecondary">
                  {leave.id}
                </HMAText>
              </View>
            </View>
          </View>

          <View style={styles.summaryGrid}>
            <SummaryItem icon="▦" label="Dates" value={leave.dates} />

            <SummaryItem icon="♙" label="Approver" value={leave.approver} />

            <SummaryItem icon="▤" label="Days" value={`${leave.days} Days`} />

            <SummaryItem icon="◆" label="Reason" value={leave.reason} />
          </View>

          <View style={styles.halfDayContainer}>
            <HMAText style={styles.halfDayIcon}>◐</HMAText>

            <View>
              <HMAText style={[]}>Half Day</HMAText>
              <HMAText style={[]} color="textSecondary">
                {leave.half_day ? 'Yes' : 'No'}
              </HMAText>
            </View>
          </View>
        </View>

        {/* Approval chain */}
        <ApprovalSteps approval={approval} />

        {/* Completion message */}
        {isApproved && (
          <View style={styles.completionContainer}>
            <View style={styles.completionIcon}>
              <HMAText style={styles.overallCheck}>✓</HMAText>
            </View>

            <View style={{ flex: 1 }}>
              <HMAText style={[]} color="success">
                Leave Request Completed
              </HMAText>
              <HMAText style={[]} color="textSecondary" size="small">
                All required approvals are completed
              </HMAText>
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default LeaveDisplayScreen;

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    fontSize: 36,
    color: COLORS.text,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },

  moreButton: {
    fontSize: 19,
    color: COLORS.text,
  },

  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 18,
    gap: 14,
  },

  overallStatusIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overallCheck: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: '800',
  },

  overallStatusTitle: {
    fontSize: 23,
    fontWeight: '800',
  },

  overallStatusSubtitle: {
    fontSize: 13,
    color: COLORS.secondary,
    marginTop: 5,
  },

  calendarDecoration: {
    fontSize: 42,
    // color: '#8BD8B4',
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 16,
  },

  leaveTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    gap: 14,
  },

  leaveIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#EAF7F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leaveIcon: {
    fontSize: 34,
    color: COLORS.primary,
  },

  leaveTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },

  leaveIdBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F3F8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },

  leaveId: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
  },

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
  },

  summaryItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    paddingRight: 8,
  },

  summaryIcon: {
    width: 23,
    alignItems: 'center',
  },

  summaryIconText: {
    fontSize: 17,
    color: COLORS.secondary,
  },

  summaryLabel: {
    color: COLORS.secondary,
    fontSize: 13,
    marginBottom: 4,
  },

  summaryValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  halfDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6FB',
    padding: 14,
    borderRadius: 18,
    marginTop: 22,
    gap: 14,
  },

  halfDayIcon: {
    fontSize: 27,
    color: colors.info,
  },

  approvalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  stepsBadge: {
    backgroundColor: '#E8F3FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  stepsBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563A9',
  },

  timelineItem: {
    flexDirection: 'row',
    minHeight: 130,
  },

  timelineRail: {
    width: 38,
    alignItems: 'center',
    position: 'relative',
  },

  timelineCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  timelineIcon: {
    fontSize: 21,
    color: COLORS.white,
    fontWeight: '800',
  },

  timelineLine: {
    position: 'absolute',
    width: 2,
    top: 34,
    bottom: 0,
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 22,
  },

  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 5,
  },

  stepLabel: {
    fontSize: 14,
    fontWeight: '800',
  },

  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },

  approvalName: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  approvalDescription: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 6,
  },

  clockIcon: {
    fontSize: 17,
    color: COLORS.secondary,
  },

  approvalDate: {
    color: COLORS.secondary,
    fontSize: 12,
  },

  commentContainer: {
    backgroundColor: '#F4F6FA',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  commentLabel: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '700',
  },

  commentText: {
    fontSize: 13,
    color: COLORS.text,
    marginTop: 4,
  },

  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFF5E9',
    borderRadius: 18,
    padding: 16,
    gap: 14,
    marginTop: 2,
  },

  completionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  completionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.successText,
  },

  completionSubtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 5,
  },
});

export const ApprovalSteps = ({ approval }: { approval: any }) => {
  return (
    <>
      <HMADivider />
      <View style={styles.card}>
        <View style={styles.approvalTitleRow}>
          <HMAText style={[]} size="large">
            Approval Chain
          </HMAText>

          <View style={styles.stepsBadge}>
            <HMAText size="xs" color="info" style={[]}>
              {approval.total_steps} Steps ·{' '}
              {approval.completed_steps === approval.total_steps
                ? 'Completed'
                : 'In Progress'}
            </HMAText>
          </View>
        </View>
        {approval.steps.map((item, index) => (
          <ApprovalTimelineItem
            key={`${item.step}-${item.name}`}
            item={item}
            isLast={index === approval.steps.length - 1}
          />
        ))}
      </View>
    </>
  );
};
