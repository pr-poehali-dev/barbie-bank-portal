import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState([1000000]);
  const [loanTerm, setLoanTerm] = useState([12]);
  const [interestRate] = useState(12.5);
  const [activeSection, setActiveSection] = useState('home');

  const calculateMonthlyPayment = () => {
    const principal = loanAmount[0];
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm[0];
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment.toFixed(2);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-secondary">Барби Банк</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Главная', 'Услуги', 'Тарифы', 'Кредиты', 'Вклады', 'О банке'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(['home', 'services', 'tariffs', 'credits', 'deposits', 'about'][idx])}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === ['home', 'services', 'tariffs', 'credits', 'deposits', 'about'][idx]
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <Button className="hidden md:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              8 800 000 00 00
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section id="home" className="relative bg-gradient-to-br from-primary to-accent py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ваш надёжный финансовый партнер
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Современные банковские решения для вашего бизнеса и личных целей. 
                Выгодные кредиты, высокие проценты по вкладам, удобные сервисы.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" className="text-lg">
                  Открыть счет
                </Button>
                <Button size="lg" variant="outline" className="text-lg bg-white hover:bg-white/90">
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Полный спектр банковских продуктов для физических и юридических лиц
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'CreditCard', title: 'Карты', desc: 'Дебетовые и кредитные карты с кэшбэком до 10%' },
                { icon: 'Wallet', title: 'Счета', desc: 'Рублевые и валютные счета с выгодными условиями' },
                { icon: 'TrendingUp', title: 'Инвестиции', desc: 'Брокерское обслуживание и доверительное управление' },
                { icon: 'Shield', title: 'Страхование', desc: 'Защита имущества, здоровья и финансов' }
              ].map((service, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="tariffs" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Тарифы</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Прозрачные условия обслуживания для всех категорий клиентов
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Базовый', price: '0', features: ['Бесплатное обслуживание', 'Мобильный банк', 'До 3% на остаток', '2 бесплатных перевода'] },
                { name: 'Премиум', price: '990', features: ['Личный менеджер', 'Кэшбэк до 10%', 'До 7% на остаток', 'Безлимитные переводы', 'Приоритетная поддержка'], highlight: true },
                { name: 'Бизнес', price: '1990', features: ['Расчетный счет', 'Эквайринг от 1.5%', 'Бухгалтерия онлайн', 'API интеграция'] }
              ].map((tariff, idx) => (
                <Card key={idx} className={tariff.highlight ? 'border-primary shadow-xl scale-105' : ''}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{tariff.price}</span>
                      <span className="text-muted-foreground"> ₽/мес</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tariff.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <Icon name="Check" className="text-primary mr-2 mt-0.5" size={18} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6" variant={tariff.highlight ? 'default' : 'outline'}>
                      Подключить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="credits" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Кредиты и калькулятор</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Рассчитайте ежемесячный платёж по кредиту онлайн
            </p>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Кредитный калькулятор</CardTitle>
                  <CardDescription>Узнайте условия кредита за минуту</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="consumer">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="consumer">Потребительский</TabsTrigger>
                      <TabsTrigger value="mortgage">Ипотека</TabsTrigger>
                      <TabsTrigger value="auto">Автокредит</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="consumer" className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Сумма кредита</label>
                          <span className="text-sm font-bold">{loanAmount[0].toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Slider
                          value={loanAmount}
                          onValueChange={setLoanAmount}
                          min={100000}
                          max={5000000}
                          step={50000}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Срок кредита</label>
                          <span className="text-sm font-bold">{loanTerm[0]} мес</span>
                        </div>
                        <Slider
                          value={loanTerm}
                          onValueChange={setLoanTerm}
                          min={6}
                          max={60}
                          step={6}
                          className="mb-4"
                        />
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-6 mt-8">
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</p>
                            <p className="text-2xl font-bold text-primary">{Number(calculateMonthlyPayment()).toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Процентная ставка</p>
                            <p className="text-2xl font-bold">{interestRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                            <p className="text-2xl font-bold">{(Number(calculateMonthlyPayment()) * loanTerm[0] - loanAmount[0]).toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </div>
                        <Button className="w-full mt-6" size="lg">
                          Оформить заявку
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mortgage" className="text-center py-8">
                      <Icon name="Home" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ипотечный калькулятор с ставкой от 7.5%</p>
                    </TabsContent>
                    
                    <TabsContent value="auto" className="text-center py-8">
                      <Icon name="Car" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Автокредит с ставкой от 9.9%</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="deposits" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Вклады</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Сохраните и приумножьте ваши средства с выгодными процентными ставками
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Накопительный', rate: '8.5', term: '3 мес', min: '10 000' },
                { name: 'Стабильный', rate: '9.2', term: '6 мес', min: '50 000' },
                { name: 'Доходный', rate: '10.5', term: '12 мес', min: '100 000' },
                { name: 'Максимальный', rate: '11.8', term: '24 мес', min: '500 000' }
              ].map((deposit, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{deposit.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">{deposit.rate}%</span>
                      <p className="text-sm text-muted-foreground mt-2">годовых</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Срок:</span>
                        <span className="font-medium">{deposit.term}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Мин. сумма:</span>
                        <span className="font-medium">{deposit.min} ₽</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Открыть вклад
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">О банке</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { number: '15+', label: 'лет на рынке' },
                  { number: '5M+', label: 'клиентов' },
                  { number: '500+', label: 'отделений' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>Барби Банк</strong> — это современный российский банк, предоставляющий полный спектр 
                    финансовых услуг для частных и корпоративных клиентов. Мы работаем с 2009 года 
                    и за это время завоевали доверие миллионов клиентов.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                    Наша миссия — делать финансовые услуги доступными, понятными и выгодными для каждого. 
                    Мы используем передовые технологии, чтобы вы могли управлять своими финансами 
                    в любое время и в любом месте.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg">
                      <Icon name="Shield" className="text-primary mr-2" size={20} />
                      <span className="text-sm font-medium">Лицензия ЦБ РФ</span>
                    </div>
                    <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg">
                      <Icon name="Award" className="text-primary mr-2" size={20} />
                      <span className="text-sm font-medium">Страхование вкладов</span>
                    </div>
                    <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg">
                      <Icon name="Lock" className="text-primary mr-2" size={20} />
                      <span className="text-sm font-medium">Защита данных</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Icon name="Building2" className="text-primary" size={24} />
                </div>
                <span className="text-xl font-bold">Барби Банк</span>
              </div>
              <p className="text-white/70 text-sm">
                Ваш надёжный финансовый партнер с 2009 года
              </p>
            </div>
            
            {[
              { title: 'Продукты', items: ['Карты', 'Кредиты', 'Вклады', 'Инвестиции'] },
              { title: 'Информация', items: ['О банке', 'Тарифы', 'Новости', 'Вакансии'] },
              { title: 'Поддержка', items: ['Контакты', 'FAQ', 'Безопасность', 'Отделения'] }
            ].map((col, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, iIdx) => (
                    <li key={iIdx}>
                      <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2024 Барби Банк. Все права защищены. Генеральная лицензия Банка России № 1234
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social, idx) => (
                <a key={idx} href="#" className="text-white/70 hover:text-white transition-colors">
                  <Icon name={social as any} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
