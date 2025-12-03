import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState([1000000]);
  const [loanTerm, setLoanTerm] = useState([12]);
  const [loanRate, setLoanRate] = useState([12.5]);
  const [mortgageAmount, setMortgageAmount] = useState([3000000]);
  const [mortgageTerm, setMortgageTerm] = useState([240]);
  const [mortgageRate, setMortgageRate] = useState([7.5]);
  const [autoAmount, setAutoAmount] = useState([800000]);
  const [autoTerm, setAutoTerm] = useState([36]);
  const [autoRate, setAutoRate] = useState([9.9]);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSchedule, setShowSchedule] = useState<string | null>(null);

  const calculatePayment = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    return monthlyPayment.toFixed(2);
  };

  const generatePaymentSchedule = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = parseFloat(calculatePayment(principal, rate, months));
    let remainingBalance = principal;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });
    }

    return schedule;
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = ['Главная', 'Услуги', 'Тарифы', 'Кредиты', 'Вклады', 'О банке'];
  const sectionIds = ['home', 'services', 'tariffs', 'credits', 'deposits', 'about'];

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
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(sectionIds[idx])}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === sectionIds[idx] ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Button className="hidden md:flex">
                <Icon name="Phone" size={16} className="mr-2" />
                8 800 000 00 00
              </Button>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col gap-6 mt-8">
                    {menuItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(sectionIds[idx])}
                        className={`text-lg font-medium text-left transition-colors hover:text-primary ${
                          activeSection === sectionIds[idx] ? 'text-primary' : 'text-secondary'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                    <Button className="w-full mt-4">
                      <Icon name="Phone" size={16} className="mr-2" />
                      8 800 000 00 00
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section id="home" className="relative bg-gradient-to-br from-primary to-accent py-24 px-4 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Ваш надёжный финансовый партнер
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Современные банковские решения для вашего бизнеса и личных целей. 
                  Выгодные кредиты, высокие проценты по вкладам, удобные сервисы.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="secondary" className="text-lg">
                        Открыть счет
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Открыть счёт в Барби Банк</DialogTitle>
                        <DialogDescription>
                          Заполните форму и мы свяжемся с вами в ближайшее время
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">ФИО</Label>
                          <Input id="name" placeholder="Иванова Анна Сергеевна" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" placeholder="+7 (900) 123-45-67" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="anna@example.com" />
                        </div>
                        <Button className="w-full">Отправить заявку</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="lg" variant="outline" className="text-lg bg-white hover:bg-white/90">
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="hidden md:block animate-fade-in">
                <img 
                  src="https://cdn.poehali.dev/projects/9b6a49ab-1107-47d3-8e2d-87364a312074/files/bb906c4f-0c8e-44c4-8836-1d83d82ffd05.jpg" 
                  alt="Банковская карта" 
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Наши услуги</h2>
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
                <Card key={idx} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-xl text-secondary">{service.title}</CardTitle>
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
            <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Тарифы</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Прозрачные условия обслуживания для всех категорий клиентов
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Базовый', price: '0', features: ['Бесплатное обслуживание', 'Мобильный банк', 'До 3% на остаток', '2 бесплатных перевода'] },
                { name: 'Премиум', price: '990', features: ['Личный менеджер', 'Кэшбэк до 10%', 'До 7% на остаток', 'Безлимитные переводы', 'Приоритетная поддержка'], highlight: true },
                { name: 'Бизнес', price: '1990', features: ['Расчетный счет', 'Эквайринг от 1.5%', 'Бухгалтерия онлайн', 'API интеграция'] }
              ].map((tariff, idx) => (
                <Card key={idx} className={`hover:shadow-xl transition-all duration-300 ${tariff.highlight ? 'border-primary shadow-xl scale-105' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-secondary">{tariff.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">{tariff.price}</span>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-6" variant={tariff.highlight ? 'default' : 'outline'}>
                          Подключить
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Подключить тариф {tariff.name}</DialogTitle>
                          <DialogDescription>
                            Заполните контактные данные для подключения тарифа
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name-tariff">ФИО</Label>
                            <Input id="name-tariff" placeholder="Иванова Анна Сергеевна" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone-tariff">Телефон</Label>
                            <Input id="phone-tariff" placeholder="+7 (900) 123-45-67" />
                          </div>
                          <Button className="w-full">Подключить тариф</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="credits" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Кредиты и калькулятор</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Рассчитайте ежемесячный платёж по кредиту онлайн
            </p>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-secondary">Кредитный калькулятор</CardTitle>
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
                          <span className="text-sm font-bold text-primary">{loanAmount[0].toLocaleString('ru-RU')} ₽</span>
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
                          <span className="text-sm font-bold text-primary">{loanTerm[0]} мес</span>
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
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Процентная ставка</label>
                          <span className="text-sm font-bold text-primary">{loanRate[0]}%</span>
                        </div>
                        <Slider
                          value={loanRate}
                          onValueChange={setLoanRate}
                          min={5}
                          max={30}
                          step={0.5}
                          className="mb-4"
                        />
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-6 mt-8">
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</p>
                            <p className="text-2xl font-bold text-primary">{Number(calculatePayment(loanAmount[0], loanRate[0], loanTerm[0])).toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Процентная ставка</p>
                            <p className="text-2xl font-bold text-primary">{loanRate[0]}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                            <p className="text-2xl font-bold text-primary">{(Number(calculatePayment(loanAmount[0], loanRate[0], loanTerm[0])) * loanTerm[0] - loanAmount[0]).toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setShowSchedule(showSchedule === 'consumer' ? null : 'consumer')}
                        >
                          <Icon name={showSchedule === 'consumer' ? 'ChevronUp' : 'ChevronDown'} size={16} className="mr-2" />
                          {showSchedule === 'consumer' ? 'Скрыть' : 'Показать'} график платежей
                        </Button>
                        
                        {showSchedule === 'consumer' && (
                          <div className="mt-4 max-h-96 overflow-y-auto border rounded-lg">
                            <table className="w-full text-sm">
                              <thead className="bg-muted sticky top-0">
                                <tr>
                                  <th className="p-2 text-left">Месяц</th>
                                  <th className="p-2 text-right">Платёж</th>
                                  <th className="p-2 text-right">Основной долг</th>
                                  <th className="p-2 text-right">Проценты</th>
                                  <th className="p-2 text-right">Остаток</th>
                                </tr>
                              </thead>
                              <tbody>
                                {generatePaymentSchedule(loanAmount[0], loanRate[0], loanTerm[0]).map((row) => (
                                  <tr key={row.month} className="border-t">
                                    <td className="p-2">{row.month}</td>
                                    <td className="p-2 text-right">{row.payment.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.principal.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.interest.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.balance.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full mt-6" size="lg">
                              Оформить заявку
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Заявка на потребительский кредит</DialogTitle>
                              <DialogDescription>
                                Сумма: {loanAmount[0].toLocaleString('ru-RU')} ₽, срок: {loanTerm[0]} мес
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="name-loan">ФИО</Label>
                                <Input id="name-loan" placeholder="Иванова Анна Сергеевна" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone-loan">Телефон</Label>
                                <Input id="phone-loan" placeholder="+7 (900) 123-45-67" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="income">Ежемесячный доход</Label>
                                <Input id="income" placeholder="50 000" />
                              </div>
                              <Button className="w-full">Отправить заявку</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mortgage" className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Стоимость недвижимости</label>
                          <span className="text-sm font-bold text-primary">{mortgageAmount[0].toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Slider
                          value={mortgageAmount}
                          onValueChange={setMortgageAmount}
                          min={1000000}
                          max={15000000}
                          step={100000}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Срок кредита</label>
                          <span className="text-sm font-bold text-primary">{Math.round(mortgageTerm[0] / 12)} лет ({mortgageTerm[0]} мес)</span>
                        </div>
                        <Slider
                          value={mortgageTerm}
                          onValueChange={setMortgageTerm}
                          min={60}
                          max={360}
                          step={12}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Процентная ставка</label>
                          <span className="text-sm font-bold text-primary">{mortgageRate[0]}%</span>
                        </div>
                        <Slider
                          value={mortgageRate}
                          onValueChange={setMortgageRate}
                          min={3}
                          max={20}
                          step={0.1}
                          className="mb-4"
                        />
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-6 mt-8">
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</p>
                            <p className="text-2xl font-bold text-primary">{Number(calculatePayment(mortgageAmount[0], mortgageRate[0], mortgageTerm[0])).toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Процентная ставка</p>
                            <p className="text-2xl font-bold text-primary">{mortgageRate[0]}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                            <p className="text-2xl font-bold text-primary">{(Number(calculatePayment(mortgageAmount[0], mortgageRate[0], mortgageTerm[0])) * mortgageTerm[0] - mortgageAmount[0]).toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setShowSchedule(showSchedule === 'mortgage' ? null : 'mortgage')}
                        >
                          <Icon name={showSchedule === 'mortgage' ? 'ChevronUp' : 'ChevronDown'} size={16} className="mr-2" />
                          {showSchedule === 'mortgage' ? 'Скрыть' : 'Показать'} график платежей
                        </Button>
                        
                        {showSchedule === 'mortgage' && (
                          <div className="mt-4 max-h-96 overflow-y-auto border rounded-lg">
                            <table className="w-full text-sm">
                              <thead className="bg-muted sticky top-0">
                                <tr>
                                  <th className="p-2 text-left">Месяц</th>
                                  <th className="p-2 text-right">Платёж</th>
                                  <th className="p-2 text-right">Основной долг</th>
                                  <th className="p-2 text-right">Проценты</th>
                                  <th className="p-2 text-right">Остаток</th>
                                </tr>
                              </thead>
                              <tbody>
                                {generatePaymentSchedule(mortgageAmount[0], mortgageRate[0], mortgageTerm[0]).map((row) => (
                                  <tr key={row.month} className="border-t">
                                    <td className="p-2">{row.month}</td>
                                    <td className="p-2 text-right">{row.payment.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.principal.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.interest.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.balance.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full mt-6" size="lg">
                              Оформить заявку
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Заявка на ипотеку</DialogTitle>
                              <DialogDescription>
                                Сумма: {mortgageAmount[0].toLocaleString('ru-RU')} ₽, срок: {Math.round(mortgageTerm[0] / 12)} лет
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="name-mortgage">ФИО</Label>
                                <Input id="name-mortgage" placeholder="Иванова Анна Сергеевна" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone-mortgage">Телефон</Label>
                                <Input id="phone-mortgage" placeholder="+7 (900) 123-45-67" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="income-mortgage">Ежемесячный доход</Label>
                                <Input id="income-mortgage" placeholder="100 000" />
                              </div>
                              <Button className="w-full">Отправить заявку</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="auto" className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Стоимость автомобиля</label>
                          <span className="text-sm font-bold text-primary">{autoAmount[0].toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Slider
                          value={autoAmount}
                          onValueChange={setAutoAmount}
                          min={300000}
                          max={5000000}
                          step={50000}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Срок кредита</label>
                          <span className="text-sm font-bold text-primary">{autoTerm[0]} мес</span>
                        </div>
                        <Slider
                          value={autoTerm}
                          onValueChange={setAutoTerm}
                          min={12}
                          max={84}
                          step={6}
                          className="mb-4"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Процентная ставка</label>
                          <span className="text-sm font-bold text-primary">{autoRate[0]}%</span>
                        </div>
                        <Slider
                          value={autoRate}
                          onValueChange={setAutoRate}
                          min={4}
                          max={25}
                          step={0.5}
                          className="mb-4"
                        />
                      </div>
                      
                      <div className="bg-primary/10 rounded-lg p-6 mt-8">
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</p>
                            <p className="text-2xl font-bold text-primary">{Number(calculatePayment(autoAmount[0], autoRate[0], autoTerm[0])).toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Процентная ставка</p>
                            <p className="text-2xl font-bold text-primary">{autoRate[0]}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                            <p className="text-2xl font-bold text-primary">{(Number(calculatePayment(autoAmount[0], autoRate[0], autoTerm[0])) * autoTerm[0] - autoAmount[0]).toLocaleString('ru-RU')} ₽</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setShowSchedule(showSchedule === 'auto' ? null : 'auto')}
                        >
                          <Icon name={showSchedule === 'auto' ? 'ChevronUp' : 'ChevronDown'} size={16} className="mr-2" />
                          {showSchedule === 'auto' ? 'Скрыть' : 'Показать'} график платежей
                        </Button>
                        
                        {showSchedule === 'auto' && (
                          <div className="mt-4 max-h-96 overflow-y-auto border rounded-lg">
                            <table className="w-full text-sm">
                              <thead className="bg-muted sticky top-0">
                                <tr>
                                  <th className="p-2 text-left">Месяц</th>
                                  <th className="p-2 text-right">Платёж</th>
                                  <th className="p-2 text-right">Основной долг</th>
                                  <th className="p-2 text-right">Проценты</th>
                                  <th className="p-2 text-right">Остаток</th>
                                </tr>
                              </thead>
                              <tbody>
                                {generatePaymentSchedule(autoAmount[0], autoRate[0], autoTerm[0]).map((row) => (
                                  <tr key={row.month} className="border-t">
                                    <td className="p-2">{row.month}</td>
                                    <td className="p-2 text-right">{row.payment.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.principal.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.interest.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                    <td className="p-2 text-right">{row.balance.toLocaleString('ru-RU', {maximumFractionDigits: 0})} ₽</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full mt-6" size="lg">
                              Оформить заявку
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Заявка на автокредит</DialogTitle>
                              <DialogDescription>
                                Сумма: {autoAmount[0].toLocaleString('ru-RU')} ₽, срок: {autoTerm[0]} мес
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="name-auto">ФИО</Label>
                                <Input id="name-auto" placeholder="Иванова Анна Сергеевна" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone-auto">Телефон</Label>
                                <Input id="phone-auto" placeholder="+7 (900) 123-45-67" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="car-model">Марка и модель авто</Label>
                                <Input id="car-model" placeholder="Toyota Camry" />
                              </div>
                              <Button className="w-full">Отправить заявку</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="deposits" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-secondary">Вклады</h2>
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
                <Card key={idx} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-secondary">{deposit.name}</CardTitle>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Открыть вклад
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Открыть вклад {deposit.name}</DialogTitle>
                          <DialogDescription>
                            Ставка: {deposit.rate}% годовых, срок: {deposit.term}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name-deposit">ФИО</Label>
                            <Input id="name-deposit" placeholder="Иванова Анна Сергеевна" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone-deposit">Телефон</Label>
                            <Input id="phone-deposit" placeholder="+7 (900) 123-45-67" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="amount-deposit">Сумма вклада</Label>
                            <Input id="amount-deposit" placeholder={deposit.min} />
                          </div>
                          <Button className="w-full">Открыть вклад</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-secondary">О банке</h2>
              
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
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed mb-4">
                      <strong className="text-primary">Барби Банк</strong> — это современный российский банк, предоставляющий полный спектр 
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
                <div className="space-y-4">
                  <img 
                    src="https://cdn.poehali.dev/projects/9b6a49ab-1107-47d3-8e2d-87364a312074/files/a433eef4-03b2-45e2-824d-4ae85e055db8.jpg" 
                    alt="Офис банка" 
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                  <img 
                    src="https://cdn.poehali.dev/projects/9b6a49ab-1107-47d3-8e2d-87364a312074/files/e0b2bfed-95f9-44b2-bf16-6d2f891da0d9.jpg" 
                    alt="Довольные клиенты" 
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
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