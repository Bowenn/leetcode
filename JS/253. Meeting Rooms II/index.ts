
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// time O(n logn), space O(n)
function minMeetingRooms(intervals: number[][]): number {
    const endTimes: MinPriorityQueue<number> = new MinPriorityQueue();
    // minHeap endTimes

    // nlogn
    intervals.sort((a, b) => a[0] - b[0]);
    
    // iterate through the intervals
    for (let i = 0; i < intervals.length; i++) {
        // check available meeting rooms
        if (!endTimes.isEmpty() && endTimes.front()! <= intervals[i][0]) {
            endTimes.dequeue();
            endTimes.enqueue(intervals[i][1]);
        }
        else {
            endTimes.enqueue(intervals[i][1]);
        }
    }

    return endTimes.size();
};
