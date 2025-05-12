import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';


export function setupNotificationHandler() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
}

TaskManager.defineTask<Notifications.NotificationTaskPayload>(
    BACKGROUND_NOTIFICATION_TASK,
    async ({ data, error }) => {
        if (error) {
            console.error('Notification task error:', error);
            return;
        }

        await checkAndNotifyFlightDelay();
    }
);


export async function checkAndNotifyFlightDelay() {
    try {
        // need a API call and caculate the deplay info here

        // Mock up response 

        const data = {
            delayed: true,
            delayMinutes: 180,
            flightNumber: 'AA123',
        }

        // Suppose API returns something like: { delayed: true, delayMinutes: 180 }
        if (data.delayed && data.delayMinutes > 0) {

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your flight has been delayed!',
                    body: `Your Flight ${data.flightNumber} have been delayed ${data.delayMinutes} minutes.`,
                },
                trigger: null,
            });
        }

        return BackgroundTask.BackgroundTaskResult.Success;
    } catch (error) {
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
}

export async function startDelayPolling(intervalInMinutes = 15) {
    setInterval(() => {
        checkAndNotifyFlightDelay();
    }, intervalInMinutes * 60 * 1000);
}

export async function registerBackgroundTask() {
    try {
        BackgroundTask.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    } catch (e) {
        console.error('Failed to register background task:', e);
    }
}