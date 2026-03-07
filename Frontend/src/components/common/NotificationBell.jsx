import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notification.api";
import "../../styles/notification.css";

const NotificationBell = () => {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Notification fetch failed", error);
    }
  };

  return (
    <div className="notification-container">

      <div
        className="notification-bell"
        onClick={() => setOpen(!open)}
      >
        🔔

        {notifications.length > 0 && (
          <span className="notification-count">
            {notifications.length}
          </span>
        )}
      </div>

      {open && (
        <div className="notification-panel">

          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="notification-item">

                <strong>{n.company}</strong>

                <p>{n.message}</p>

                <small>
                  {new Date(n.date).toLocaleDateString()}
                </small>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
};

export default NotificationBell;