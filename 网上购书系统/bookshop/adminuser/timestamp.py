from datetime import datetime
import time


# get timestamp
class TimeStamp:

    def gettimestamp(self):
        now_time = str(datetime.now())
        now_time = time.strptime(now_time[0:len(now_time) - 7], '%Y-%m-%d %H:%M:%S')
        time_stamp = int(time.mktime(now_time))
        return time_stamp

    def stamptotime(self, timestamp):
        time_local = time.localtime(timestamp)
        dt = time.strftime("%Y-%m-%d %H:%M", time_local)
        return dt
