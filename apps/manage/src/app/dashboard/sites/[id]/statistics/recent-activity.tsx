interface RecentEvent {
  id: string;
  eventLabel: string;
  contextLabel: string;
  time: string;
}

interface RecentActivityProps {
  events: RecentEvent[];
  labels: {
    recentEvents: string;
    event: string;
    feature: string;
    time: string;
    noEventsYet: string;
  };
}

export function RecentActivity({
  events,
  labels,
}: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        {labels.recentEvents}
      </h3>
      {events.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">
          {labels.noEventsYet}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8eaf0] dark:border-[#2a2a3e]">
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.event}
                </th>
                <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.feature}
                </th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {labels.time}
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[#f8f9fc] dark:border-[#2a2a3e] last:border-0"
                >
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {event.eventLabel}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">
                    {event.contextLabel}
                  </td>
                  <td className="py-2 text-gray-400 dark:text-gray-600 text-xs">
                    {event.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
