# Cloud Engineer Coding Test

## Problem

The objective is to simulate sending a large number of SMS alerts, like for an
emergency alert service. The simulation consists of three parts:

1.  A producer that generates a configurable number of messages (default 1000)
    to random phone number. Each message contains up to 100 random characters.
2.  A sender, who picks up messages from the producer and simulates sending
    messages by waiting a random period time distributed around a configurable
    mean. The sender also has a configurable failure rate.
3.  A progress monitor that displays the following and updates it every N
    seconds (configurable):

    -   Number of messages sent so far
    -   Number of messages failed so far
    -   Average time per message so far

One instance each for the producer and the progress monitor will be started
while a variable number of senders can be started with different mean
processing time and error rate settings.

You are free in the programming language you choose, but your code should come
with reasonable unit testing.

Please submit the code test at least two business days before the interview, so
we have time to review it.

## Proposed solution

### Suppositions

- It would be weird that all messages being sent to a single number, so this
  proposed solution will assume that each message is sent to a random number.
- Numbers will just be random 10-digits, but it's not important. We won't take
  into account the different SMS services (A2P 10 DLC: Application-to-person
  10-digit-long-code).
- Time will only count time since queueing. Tracking each step could be done but
  considered out-of-scope.
- For time saving in dev, all services will be HTTP with expressJS. Producer and
  progress monitor will only be simple console.


### Architecture of services

- One registry for activated senders, queue, log server, db.
- One queue so that senders would fetch messages to send instead of a pool
  model.
- One log server to keep trace of all events.
- One in-memory DB to keep track of states.


## Usage

### Installation

    npm ci

### Build

    npm run build

### Testing

Testing is ran during `npm run build`.

We can run all the test suite with: `npm test`.

If you are in development, you can also run `npm run test:watch` for tests to
run every time a file is saved.


### Execution

Each should be run in a different terminal. This would somewhat simulate the
distributed nature of the services. They are using the same code base, but we
can assume they are in their own micro-service setup.

The env variables indicates the default values.


#### Registry

    REGISTRY_PORT=9000 npm run registry

This registry will act like if it was a Queue, but also database and log server.
In reality, we would want to send logs to another service.


### Producer

    REGISTRY_URL=http://localhost:9000/registry NUMBER_OF_MESSAGES_TO_SEND=1000 npm run producer

This will just connect to the registry and send the number of messages.


### Monitor

    REGISTRY_URL=http://localhost:9000/registry MONITOR_REFRESH_DELAY=5 npm run monitor

`MONITOR_REFRESH_DELAY` is the number of seconds between calls.

### Sender

    REGISTRY_URL=http://localhost:9000/registry SENDER_DELAY=250 npm run sender

`SENDER_DELAY` is in millis. This will just be used as a delay between
processing of each SMS.

This service can be seen as an external service like AWS SNS or Twilio. We can
execute many of these.
