import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { SHOOT_TYPES, TIME_SLOTS, SHOOT_TYPE_LABELS, TIME_SLOT_LABELS } from '../constants/enums.js';
import { photoApi } from '../api/photoApi.js';
import { printTable } from '../utils/table.js';
import { printApiError } from '../utils/errors.js';
import { Schedule } from '../types/domain.js';

export function registerScheduleCommand(program: Command): void {
  program.command('schedule').description('批量发布约拍档期').action(async () => {
    try {
      const answer = await inquirer.prompt([
        { type: 'input', name: 'dates', message: '可约日期，逗号分隔，例如 2026-06-10,2026-06-11' },
        { type: 'list', name: 'slot', message: '时段', choices: TIME_SLOTS },
        { type: 'list', name: 'shootType', message: '拍摄类型', choices: SHOOT_TYPES },
        { type: 'number', name: 'price', message: '价格' },
        { type: 'input', name: 'city', message: '服务城市' },
      ]);
      const payload = { ...answer, dates: String(answer.dates).split(',').map((item) => item.trim()) };
      await photoApi.createSchedules(payload);
      console.log(chalk.green('档期已发布。'));
    } catch (error) { printApiError(error); }
  });

  program.command('my-schedule').description('查看我的档期，支持删除空闲档期').action(async () => {
    try {
      const schedules: Schedule[] = await photoApi.listSchedules();
      if (schedules.length === 0) {
        console.log(chalk.yellow('暂无发布的档期。'));
        return;
      }
      const rows = schedules.map((item) => [
        item.id,
        item.date,
        TIME_SLOT_LABELS[item.slot] ?? item.slot,
        SHOOT_TYPE_LABELS[item.shootType] ?? item.shootType,
        item.price,
        item.city,
        item.booked ? chalk.red(`已约 (${item.customerName ?? '已预约'})`) : chalk.green('空闲'),
      ]);
      printTable(['ID', '日期', '时段', '类型', '价格', '城市', '状态'], rows);
      const freeIds = schedules.filter((s) => !s.booked).map((s) => s.id);
      if (freeIds.length === 0) {
        console.log(chalk.yellow('没有可删除的空闲档期。'));
        return;
      }
      const answer = await inquirer.prompt<{ remove: boolean; id: number }>([
        { type: 'confirm', name: 'remove', message: '是否删除空闲档期？' },
        {
          type: 'list',
          name: 'id',
          message: '选择要删除的档期 ID',
          choices: freeIds,
          when: (a: { remove?: boolean }) => a.remove,
        },
      ]);
      if (answer.remove) {
        await photoApi.deleteSchedule(answer.id);
        console.log(chalk.green(`档期 ${answer.id} 已删除。`));
      }
    } catch (error) { printApiError(error); }
  });
}
