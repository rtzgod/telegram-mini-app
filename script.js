// Данные курса
const course = {
    title: "Терминал Linux. Основы",
    modules: [
        {
            title: "Модуль 1: Введение",
            lessons: [
                {
                    title: "1.1 Знакомство",
                    steps: [
                        {
                            title: "Знакомство с терминалом",
                            description: "Описание шага 1",
                            video: "video/lesson1_step1.mp4"
                        },
                        {
                            title: "Установка VirtualBox",
                            description: "Описание шага 2",
                            video: "video/lesson1_step2.mp4"
                        },
                        {
                            title: "Запуск терминала",
                            description: "Описание шага 3",
                            video: "video/lesson1_step3.mp4"
                        }
                    ]
                },
                {
                    title: "1.2 Установка Linux Ubuntu как виртуальной машины",
                    steps: [
                        {
                            title: "Шаг 1",
                            description: "Описание шага 1",
                            video: "video/lesson2_step1.mp4"
                        },
                        {
                            title: "Шаг 2",
                            description: "Описание шага 2",
                            video: "video/lesson2_step2.mp4"
                        }
                    ]
                }
                // Добавьте больше уроков по необходимости
            ]
        }
        // Добавьте больше модулей по необходимости
    ]
};

// Переменные состояния
let currentModuleIndex = 0;
let currentLessonIndex = 0;
let currentStepIndex = 0;

// Инициализация страницы
document.addEventListener('DOMContentLoaded', () => {
    renderCourseStructure();
    loadCurrentStep();
    updateNavigationButtons();
    updateProgress();

    // Обработчики событий для кнопок навигации
    document.getElementById('next-step').addEventListener('click', () => {
        goToNextStep();
    });

    document.getElementById('prev-step').addEventListener('click', () => {
        goToPrevStep();
    });

    document.getElementById('continue-course').addEventListener('click', () => {
        loadCurrentStep();
    });
});

// Функции

function renderCourseStructure() {
    const courseStructure = document.getElementById('course-structure');
    course.modules.forEach((module, moduleIndex) => {
        const moduleItem = document.createElement('li');
        const moduleTitle = document.createElement('h3');
        moduleTitle.textContent = module.title;
        moduleItem.appendChild(moduleTitle);

        const lessonList = document.createElement('ul');
        module.lessons.forEach((lesson, lessonIndex) => {
            const lessonItem = document.createElement('li');
            lessonItem.textContent = lesson.title;
            lessonItem.addEventListener('click', () => {
                currentModuleIndex = moduleIndex;
                currentLessonIndex = lessonIndex;
                currentStepIndex = 0;
                loadCurrentStep();
                updateNavigationButtons();
            });

            // Добавляем индикатор прогресса урока
            const lessonProgress = document.createElement('span');
            lessonProgress.classList.add('lesson-progress');
            lessonProgress.textContent = `0/${lesson.steps.length}`;
            lessonItem.appendChild(lessonProgress);

            lessonList.appendChild(lessonItem);
        });

        moduleItem.appendChild(lessonList);
        courseStructure.appendChild(moduleItem);
    });
}

function loadCurrentStep() {
    const lesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
    const step = lesson.steps[currentStepIndex];

    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-description').textContent = step.description;

    const videoElement = document.getElementById('lesson-video');
    videoElement.querySelector('source').src = step.video;
    videoElement.load();

    document.getElementById('step-progress').textContent = `Шаг ${currentStepIndex + 1} из ${lesson.steps.length}`;

    updateNavigationButtons();
    updateProgress();
}

function goToNextStep() {
    const lesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
    if (currentStepIndex < lesson.steps.length - 1) {
        currentStepIndex++;
    } else {
        // Переход к следующему уроку
        if (currentLessonIndex < course.modules[currentModuleIndex].lessons.length - 1) {
            currentLessonIndex++;
            currentStepIndex = 0;
        } else if (currentModuleIndex < course.modules.length - 1) {
            // Переход к следующему модулю
            currentModuleIndex++;
            currentLessonIndex = 0;
            currentStepIndex = 0;
        } else {
            alert('Вы завершили курс!');
            return;
        }
    }
    loadCurrentStep();
}

function goToPrevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
    } else {
        // Переход к предыдущему уроку
        if (currentLessonIndex > 0) {
            currentLessonIndex--;
            const prevLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
            currentStepIndex = prevLesson.steps.length - 1;
        } else if (currentModuleIndex > 0) {
            // Переход к предыдущему модулю
            currentModuleIndex--;
            currentLessonIndex = course.modules[currentModuleIndex].lessons.length - 1;
            const prevLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
            currentStepIndex = prevLesson.steps.length - 1;
        } else {
            // Это первый шаг курса
            return;
        }
    }
    loadCurrentStep();
}

function updateNavigationButtons() {
    const lesson = course.modules[currentModuleIndex].lessons[currentLessonIndex];
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');

    // Проверяем, есть ли предыдущий шаг
    if (currentModuleIndex === 0 && currentLessonIndex === 0 && currentStepIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }

    // Проверяем, есть ли следующий шаг
    const isLastModule = currentModuleIndex === course.modules.length - 1;
    const isLastLesson = currentLessonIndex === course.modules[currentModuleIndex].lessons.length - 1;
    const isLastStep = currentStepIndex === lesson.steps.length - 1;

    if (isLastModule && isLastLesson && isLastStep) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
    }
}

function updateProgress() {
    // Обновление прогресса курса
    const totalSteps = course.modules.reduce((moduleAcc, module) => {
        return moduleAcc + module.lessons.reduce((lessonAcc, lesson) => {
            return lessonAcc + lesson.steps.length;
        }, 0);
    }, 0);

    const completedSteps = getCompletedSteps();

    const progressPercent = Math.floor((completedSteps / totalSteps) * 100);
    document.getElementById('overall-progress').style.width = `${progressPercent}%`;
    document.getElementById('materials-progress').textContent = `${progressPercent}% материалов пройдено`;

    // Обновление баллов (для примера используем 1 балл за шаг)
    document.getElementById('points-earned').textContent = `${completedSteps}/${totalSteps} баллов получено`;
}

function getCompletedSteps() {
    // Для простоты считаем все пройденные шаги до текущего
    let stepsCount = 0;

    for (let m = 0; m <= currentModuleIndex; m++) {
        const module = course.modules[m];
        const lastLessonIndex = (m === currentModuleIndex) ? currentLessonIndex : module.lessons.length - 1;

        for (let l = 0; l <= lastLessonIndex; l++) {
            const lesson = module.lessons[l];
            const lastStepIndex = (m === currentModuleIndex && l === currentLessonIndex) ? currentStepIndex : lesson.steps.length - 1;

            stepsCount += lastStepIndex + 1;
        }
    }

    return stepsCount;
}
