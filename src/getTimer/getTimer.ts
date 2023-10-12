import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import { padNumber } from '../padNumber/padNumber'

dayjs.extend(duration)
dayjs.extend(timezone)

export function getTimer(endDate: string, endDateTimezone: string) {
	let isOutOfTime = false

	if (!endDate) {
		return { timeLeft: null, isOutOfTime }
	}

	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const endDateTime = dayjs.tz(endDate, endDateTimezone).tz(userTimezone)

	const currentDateTime = dayjs.tz(new Date(), userTimezone)

	const differenceMs = endDateTime.diff(currentDateTime)

	if (differenceMs < 0) {
		isOutOfTime = true
	}

	const duration = dayjs.duration(differenceMs)
	const seconds = duration.seconds()
	const minutes = duration.minutes()
	const hours = duration.hours()

	const formattedTime = `${padNumber({
		number: hours,
		padLength: 1,
	})}:${padNumber({
		number: minutes,
		padLength: 2,
	})}:${padNumber({ number: seconds, padLength: 2 })}`

	return { timeLeft: formattedTime, isOutOfTime }
}
