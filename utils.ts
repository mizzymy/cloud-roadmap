import { Course, Roadmap } from './types';

/**
 * Parses a duration string (e.g. "1h 30m", "45m", "2h") into total minutes.
 */
export const parseDuration = (durationStr: string): number => {
  if (!durationStr) return 0;
  
  let totalMinutes = 0;
  
  const hoursMatch = durationStr.match(/(\d+)\s*h/i);
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1], 10) * 60;
  }
  
  const minutesMatch = durationStr.match(/(\d+)\s*m/i);
  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1], 10);
  }
  
  return totalMinutes;
};

/**
 * Formats minutes into a readable string (e.g. "2h 15m")
 */
export const formatDuration = (minutes: number): string => {
  if (minutes === 0) return '0m';
  
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

/**
 * Calculates the total duration of a Course in minutes.
 * If the course uses metric tracking (TIME), it returns the target.
 * Otherwise, it sums up the durations of all lessons across all modules.
 */
export const getCourseDuration = (course: Course): number => {
  if (course.isSkipped || course.isEnabled === false) return 0;
  if (course.tracking && course.tracking.mode === 'TIME') {
    // Target is assumed to be in minutes
    return course.tracking.target || 0;
  }
  
  let totalMinutes = 0;
  course.modules?.forEach(mod => {
    if (mod.isSkipped) return;
    mod.lessons?.forEach(les => {
      if (les.isSkipped) return;
      totalMinutes += parseDuration(les.duration);
    });
  });
  
  return totalMinutes;
};

export const getCourseCompletedDuration = (course: Course): number => {
  if (course.isSkipped || course.isEnabled === false) return 0;
  if (course.tracking && course.tracking.mode === 'TIME') {
    return course.tracking.current || 0;
  }
  
  let completedMinutes = 0;
  course.modules?.forEach(mod => {
    if (mod.isSkipped) return;
    mod.lessons?.forEach(les => {
      if (les.isSkipped) return;
      if (les.isCompleted) {
        completedMinutes += parseDuration(les.duration);
      }
    });
  });
  
  return completedMinutes;
};

/**
 * Calculates the total duration of a Roadmap in minutes by summing up all its courses.
 */
export const getRoadmapDuration = (roadmap: Roadmap): number => {
  let totalMinutes = 0;
  roadmap.phases?.forEach(phase => {
    phase.courses?.forEach(course => {
      totalMinutes += getCourseDuration(course);
    });
  });
  return totalMinutes;
};

export const getRoadmapCompletedDuration = (roadmap: Roadmap): number => {
  let totalMinutes = 0;
  roadmap.phases?.forEach(phase => {
    phase.courses?.forEach(course => {
      totalMinutes += getCourseCompletedDuration(course);
    });
  });
  return totalMinutes;
};
