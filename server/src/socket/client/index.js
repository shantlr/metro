import { Server, Socket } from 'socket.io';
import { MESSAGES } from '../../pubsub';
import { CLIENT_PUBLISH, CLIENT_ROOMS } from './constants';

/**
 *
 * @param {Object} input
 * @param {Server} input.io
 */
export const setupClientSubscription = async ({ io }) => {
  MESSAGES.command.created.subscribe((cmd) => {
    io.in(CLIENT_ROOMS.commands).emit(CLIENT_PUBLISH.command, {
      type: 'created',
      command: cmd,
    });
  });
  MESSAGES.command.deleted.subscribe((cmd) => {
    io.in(CLIENT_ROOMS.commands).emit(CLIENT_PUBLISH.command, {
      type: 'deleted',
      commandId: cmd.id,
    });
  });
  MESSAGES.command.updated.subscribe((cmd) => {
    io.in(CLIENT_ROOMS.commands).emit(CLIENT_PUBLISH.command, {
      type: 'updated',
      command: cmd,
    });
  });

  MESSAGES.runner.connected.subscribe(() => {
    const number = io.of('runner').sockets.size;
    io.in(CLIENT_ROOMS.runnerAvailable).emit(
      CLIENT_PUBLISH.runnerAvailable,
      number > 0
    );
  });
  MESSAGES.runner.disconnected.subscribe(() => {
    const number = io.of('runner').sockets.size;
    io.in('subscribe-runner-available').emit(
      CLIENT_PUBLISH.runnerAvailable,
      number > 0
    );
  });
};

/**
 *
 * @param {Object} input
 * @param {Socket} input.socket
 * @param {Server} input.io
 */
export const setupClientSocket = ({ io, socket }) => {
  socket.on('subscribe-commands', () => {
    socket.join(CLIENT_ROOMS.commands);
  });
  socket.on('unsubscribe-commands', () => {
    socket.leave(CLIENT_ROOMS.commands);
  });

  socket.on('subscribe-runner-available', () => {
    socket.join(CLIENT_ROOMS.runnerAvailable);
    // send current state on subscribe
    socket.emit(
      CLIENT_PUBLISH.runnerAvailable,
      io.of('runner').sockets.size > 0
    );
  });
  socket.on('unsubscribe-runner-available', () => {
    socket.leave(CLIENT_ROOMS.runnerAvailable);
  });

  socket.on('subscribe-command-logs', ({ commandId }) => {
    socket.join(CLIENT_ROOMS.commandLog(commandId));
  });
  socket.on('unsubscribe-command-logs', ({ commandId }) => {
    socket.leave(CLIENT_ROOMS.commandLog(commandId));
  });
};