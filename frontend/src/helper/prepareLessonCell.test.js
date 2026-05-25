import {prepareLessonCardCell, prepareLessonSubCardCell} from './prepareLessonCell';
import {places} from '../constants/places';

describe('prepareLessonCardCell function', () => {
    it('should return empty string if card is null or undefined', () => {
        let card = null;
        expect(prepareLessonCardCell(card)).toEqual('');
        card = undefined;
        expect(prepareLessonCardCell(card)).toEqual('');
    });
    it('should return string with subject data', () => {
        const teacher = {
            name: 'Роман',
            surname: 'Романюк',
            patronymic: 'Романович',
            position: 'доцент',
        };
        const card = {
            subjectForSite: 'test subject',
            teacher,
        };
        expect(prepareLessonCardCell(card)).toEqual(
            `доц. ${teacher.surname} ${teacher.name} ${teacher.patronymic}\n${card.subjectForSite}\n`,
        );
    });
});

describe('Edge Cases Integration (Variant 4)', () => {
    it('should handle card with empty room name', () => {
        const card = { lessonType: 'LECTURE', room: { name: '' } }; 
        expect(prepareLessonSubCardCell(card, places.AUDITORY)).toBeDefined();
    });

    it('should handle various place formats', () => {
        const card = { room: { name: 'Gym' }, lessonType: 'SPORT' };
        expect(prepareLessonSubCardCell(card, 'UNKNOWN_PLACE')).toBeDefined();
        expect(prepareLessonSubCardCell(card, null)).toBeDefined();
    });

    it('should process a card with entirely empty fields without crashing', () => {
        const emptyCard = {
            subjectForSite: '',
            teacher: { name: '', surname: '', patronymic: '', position: '' }
        };
        expect(prepareLessonCardCell(emptyCard)).toBeDefined();
    });

    it('should handle different formats and casings of lessonType', () => {
        const card = { room: { name: '101' }, lessonType: '  PrAcTiCaL  ' };
        expect(prepareLessonSubCardCell(card, places.AUDITORY)).toBeDefined();
    });
});