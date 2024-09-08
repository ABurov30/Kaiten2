import { v4 as uuidv4 } from 'uuid';
import { ToDo } from '../../entities/types';

export const mockToDos: ToDo[] = [
  {
    id: uuidv4(),
    title: 'Купить молоко',
    description: 'Необходимо купить 2 литра молока',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Сделать домашнее задание',
    description: 'Завершить проект по TypeScript',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Погулять с собакой',
    description: 'Выгулять собаку в парке',
    isDone: true,
  },
  {
    id: uuidv4(),
    title: 'Сходить в спортзал',
    description: 'Тренировка на беговой дорожке и силовые упражнения',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Приготовить ужин',
    description: 'Приготовить пасту с соусом',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Почитать книгу',
    description: 'Продолжить читать "Война и мир"',
    isDone: true,
  },
  {
    id: uuidv4(),
    title: 'Убрать в квартире',
    description: 'Пропылесосить и убрать пыль',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Сходить в магазин',
    description: 'Купить фрукты и овощи',
    isDone: false,
  },
  {
    id: uuidv4(),
    title: 'Запланировать поездку',
    description: 'Собрать информацию о местах для отдыха',
    isDone: true,
  },
  {
    id: uuidv4(),
    title: 'Посмотреть новый фильм',
    description: 'Посмотреть "Тенет"',
    isDone: false,
  },
];
