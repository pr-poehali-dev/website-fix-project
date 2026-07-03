import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const EVENT_DATE = new Date('2026-08-15T16:00:00');

const useCountdown = (target: Date) => {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};

const Divider = () => (
  <div className="flex items-center justify-center gap-4 my-2">
    <span className="h-px w-16 bg-border" />
    <Icon name="Heart" size={16} className="text-primary" />
    <span className="h-px w-16 bg-border" />
  </div>
);

const Index = () => {
  const t = useCountdown(EVENT_DATE);
  const [submitted, setSubmitted] = useState(false);

  const countItems = [
    { label: 'дней', value: t.days },
    { label: 'часов', value: t.hours },
    { label: 'минут', value: t.minutes },
    { label: 'секунд', value: t.seconds },
  ];

  const program = [
    { time: '16:00', title: 'Сбор гостей', icon: 'Wine' },
    { time: '16:30', title: 'Церемония', icon: 'Heart' },
    { time: '17:30', title: 'Праздничный банкет', icon: 'UtensilsCrossed' },
    { time: '20:00', title: 'Первый танец', icon: 'Music' },
    { time: '22:00', title: 'Праздничный салют', icon: 'Sparkles' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center paper-texture">
        <div className="animate-fade-in">
          <p className="font-body uppercase tracking-widest-xl text-xs text-primary mb-8">
            Приглашение
          </p>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none">
            Анна
          </h1>
          <div className="my-4 font-display italic text-4xl md:text-5xl text-primary animate-float">
            &amp;
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none">
            Михаил
          </h1>
        </div>
        <div className="animate-fade-up mt-10" style={{ animationDelay: '0.5s' }}>
          <Divider />
          <p className="font-display text-2xl md:text-3xl text-foreground/80 mt-4">
            15 августа 2026
          </p>
          <p className="font-body text-sm text-muted-foreground tracking-wide mt-2">
            приглашаем разделить с нами этот день
          </p>
        </div>
        <div className="absolute bottom-10 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Icon name="ChevronDown" size={28} className="text-primary/60 animate-bounce" />
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-24 px-6 bg-secondary/40">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body uppercase tracking-widest-xl text-xs text-primary mb-3">
            До торжества осталось
          </p>
          <div className="grid grid-cols-4 gap-3 md:gap-8 mt-10">
            {countItems.map((c) => (
              <div key={c.label} className="flex flex-col">
                <span className="font-display text-4xl md:text-7xl font-light text-foreground tabular-nums">
                  {String(c.value).padStart(2, '0')}
                </span>
                <span className="font-body uppercase tracking-widest text-[10px] md:text-xs text-muted-foreground mt-2">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light mb-4">Детали события</h2>
          <Divider />
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {[
              { icon: 'CalendarHeart', title: 'Дата', text: '15 августа 2026\nсуббота' },
              { icon: 'Clock', title: 'Время', text: '16:00\nсбор гостей' },
              { icon: 'MapPin', title: 'Место', text: 'Усадьба «Времена года»\nг. Москва' },
            ].map((d) => (
              <div key={d.title} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-5">
                  <Icon name={d.icon} size={26} className="text-accent-foreground" />
                </div>
                <h3 className="font-display text-2xl mb-2">{d.title}</h3>
                <p className="font-body text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="py-24 px-6 bg-secondary/40">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-light mb-4 text-center">
            Программа дня
          </h2>
          <Divider />
          <div className="mt-14 space-y-8">
            {program.map((p) => (
              <div key={p.time} className="flex items-center gap-4 md:gap-6">
                <span className="font-display text-2xl md:text-3xl text-primary w-16 md:w-20 shrink-0 text-right">
                  {p.time}
                </span>
                <span className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-3 w-44 md:w-56 shrink-0">
                  <Icon name={p.icon} size={20} className="text-primary shrink-0" />
                  <span className="font-body text-sm md:text-base text-foreground/90">
                    {p.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light mb-4">
            Подтвердите присутствие
          </h2>
          <Divider />
          <p className="font-body text-sm text-muted-foreground mt-4 mb-10">
            Пожалуйста, ответьте до 1 августа 2026
          </p>
          {submitted ? (
            <div className="animate-scale-in py-10">
              <Icon name="CheckCircle2" size={48} className="text-primary mx-auto mb-4" />
              <p className="font-display text-3xl">Спасибо!</p>
              <p className="font-body text-sm text-muted-foreground mt-2">
                Мы получили ваш ответ и очень ждём встречи
              </p>
            </div>
          ) : (
            <form
              className="space-y-4 text-left"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Input placeholder="Ваше имя и фамилия" required className="bg-card h-12" />
              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="h-12 font-body">
                  Буду с радостью
                </Button>
                <Button type="button" variant="outline" className="h-12 font-body">
                  К сожалению, нет
                </Button>
              </div>
              <Textarea
                placeholder="Пожелания или вопросы (необязательно)"
                className="bg-card min-h-24"
              />
              <Button type="submit" className="w-full h-12 font-body tracking-wide">
                Отправить ответ
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section className="py-20 px-6 bg-primary/5 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-light mb-8">Контакты</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { name: 'Анна', role: 'невеста', phone: '+7 (900) 123-45-67' },
              { name: 'Михаил', role: 'жених', phone: '+7 (900) 765-43-21' },
            ].map((c) => (
              <div key={c.name}>
                <p className="font-display text-2xl">{c.name}</p>
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  {c.role}
                </p>
                <a
                  href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}
                  className="font-body text-sm text-primary hover:underline"
                >
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
          <Divider />
          <p className="font-display italic text-xl text-foreground/70 mt-8">
            С любовью, Анна &amp; Михаил
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
