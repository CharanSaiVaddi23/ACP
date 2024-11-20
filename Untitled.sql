DELIMITER $$

CREATE TRIGGER after_event_update
AFTER UPDATE ON event
FOR EACH ROW
BEGIN
    INSERT INTO notification (Content, Timestamp, read_status)
    VALUES (CONCAT('Event updated: ', OLD.title, ' - ', OLD.event_desc, ' -> ', NEW.title, ' - ', NEW.event_desc, ' Contact: ', NEW.contact_info), NOW(), 0);
END$$

DELIMITER ;

