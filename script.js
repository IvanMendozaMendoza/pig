'use strict';

// ELEMENTS
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const player1Name = document.querySelector('.name--0');
const player2Name = document.querySelector('.name--1');
const score_1 = document.getElementById('score--0');
const score_2 = document.getElementById('score--1');
const current_1 = document.getElementById('current--0');
const current_2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');

// BUTTONS
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;

const init = function () {
  score_1.textContent = 0;
  score_2.textContent = 0;
  current_1.textContent = 0;
  current_1.textContent = 0;
  player1Name.textContent = 'player 1';
  player2Name.textContent = 'player 2';
  dice.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  dice.style.opacity = 1;
  dice.style.visibility = 'visible';
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  
};
init();

const swich = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  if (window.matchMedia('(max-width: 40em)').matches) {
    const buttons = document.querySelectorAll('button p');
    buttons.forEach(button => {
      button.classList.toggle('rotate');
    });
  }
};

btnRoll.addEventListener('click', function () {
  // roll dice
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.style.opacity = 1;
    dice.style.visibility = 'visible';
    dice.src = `/dice-${diceNum}.png`;

    // check if 1?
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swich();
    }
  }
});
// between buttons

      //? CONFETTI TIME --------------------------------
      //? ----------------------------------------------
      //? ----------------------------------------------
      //? -----------------------------------------------
      var maxParticleCount = 150; //set max confetti count
      var particleSpeed = 2; //set the particle animation speed
      var startConfetti; //call to start confetti animation
      var stopConfetti; //call to stop adding confetti
      var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
      var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

      (function () {
        startConfetti = startConfettiInner;
        stopConfetti = stopConfettiInner;
        toggleConfetti = toggleConfettiInner;
        removeConfetti = removeConfettiInner;
        var colors = [
          'DodgerBlue',
          'OliveDrab',
          'Gold',
          'Pink',
          'SlateBlue',
          'LightBlue',
          'Violet',
          'PaleGreen',
          'SteelBlue',
          'SandyBrown',
          'Chocolate',
          'Crimson',
        ];
        var streamingConfetti = false;
        var animationTimer = null;
        var particles = [];
        var waveAngle = 0;

        function resetParticle(particle, width, height) {
          particle.color = colors[(Math.random() * colors.length) | 0];
          particle.x = Math.random() * width;
          particle.y = Math.random() * height - height;
          particle.diameter = Math.random() * 10 + 5;
          particle.tilt = Math.random() * 10 - 10;
          particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
          particle.tiltAngle = 0;
          return particle;
        }

        function startConfettiInner() {
          var width = window.innerWidth;
          var height = window.innerHeight;
          window.requestAnimFrame = (function () {
            return (
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (callback) {
                return window.setTimeout(callback, 16.6666667);
              }
            );
          })();
          var canvas = document.getElementById('confetti-canvas');
          if (canvas === null) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'confetti-canvas');
            canvas.setAttribute(
              'style',
              'display:block;z-index:999999;pointer-events:none; position: absolute;'
            );
            document.body.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener(
              'resize',
              function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
              },
              true
            );
          }
          var context = canvas.getContext('2d');
          while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, width, height));
          streamingConfetti = true;
          if (animationTimer === null) {
            (function runAnimation() {
              context.clearRect(0, 0, window.innerWidth, window.innerHeight);
              if (particles.length === 0) animationTimer = null;
              else {
                updateParticles();
                drawParticles(context);
                animationTimer = requestAnimFrame(runAnimation);
              }
            })();
          }
        }

        function stopConfettiInner() {
          streamingConfetti = false;
        }

        function removeConfettiInner() {
          stopConfetti();
          particles = [];
        }

        function toggleConfettiInner() {
          if (streamingConfetti) stopConfettiInner();
          else startConfettiInner();
        }

        function drawParticles(context) {
          var particle;
          var x;
          for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(
              x,
              particle.y + particle.tilt + particle.diameter / 2
            );
            context.stroke();
          }
        }

        function updateParticles() {
          var width = window.innerWidth;
          var height = window.innerHeight;
          var particle;
          waveAngle += 0.01;
          for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (!streamingConfetti && particle.y < -15)
              particle.y = height + 100;
            else {
              particle.tiltAngle += particle.tiltAngleIncrement;
              particle.x += Math.sin(waveAngle);
              particle.y +=
                (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
              particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (
              particle.x > width + 20 ||
              particle.x < -20 ||
              particle.y > height
            ) {
              if (streamingConfetti && particles.length <= maxParticleCount)
                resetParticle(particle, width, height);
              else {
                particles.splice(i, 1);
                i--;
              }
            }
          }
        }
      })();
      //? end of confetti time ---------------------------------------------
      //? -------------------------------------------------------
      //? -------------------------------------------------------
      //? -------------------------------------------------------
// ------------
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // score >= 100?
    if (scores[activePlayer] >= 100) {
    //   dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;

    //   moment confetti 1:
    startConfetti();
      //* OTHER MOMENT CONFETTI-------------------------------------------------------
      //* ------------------------------------------------------------------------------
      //* ------------------------------------------------------------------------------
      //* ------------------------------------------------------------------------------
      //* ------------------------------------------------------------------------------
      //* ------------------------------------------------------------------------------
      var Confetti = (function () {
        var t = (function () {
            return function () {
              (this.gravity = 10),
                (this.particle_count = 75),
                (this.particle_size = 1),
                (this.explosion_power = 25),
                (this.destroy_target = !0),
                (this.fade = !1);
            };
          })(),
          e = (function () {
            function e(n) {
              var r = this;
              if (
                ((this.bursts = []),
                (this.setCount = function (t) {
                  if ('number' != typeof t)
                    throw new Error("Input must be of type 'number'");
                  e.CONFIG.particle_count = t;
                }),
                (this.setPower = function (t) {
                  if ('number' != typeof t)
                    throw new Error("Input must be of type 'number'");
                  e.CONFIG.explosion_power = t;
                }),
                (this.setSize = function (t) {
                  if ('number' != typeof t)
                    throw new Error("Input must be of type 'number'");
                  e.CONFIG.particle_size = t;
                }),
                (this.setFade = function (t) {
                  if ('boolean' != typeof t)
                    throw new Error("Input must be of type 'boolean'");
                  e.CONFIG.fade = t;
                }),
                (this.destroyTarget = function (t) {
                  if ('boolean' != typeof t)
                    throw new Error("Input must be of type 'boolean'");
                  e.CONFIG.destroy_target = t;
                }),
                (this.setupCanvasContext = function () {
                  if (!e.CTX) {
                    var t = document.createElement('canvas');
                    (e.CTX = t.getContext('2d')),
                      (t.width = 2 * window.innerWidth),
                      (t.height = 2 * window.innerHeight),
                      (t.style.position = 'fixed'),
                      (t.style.top = '0'),
                      (t.style.left = '0'),
                      (t.style.width = 'calc(100%)'),
                      (t.style.height = 'calc(100%)'),
                      (t.style.margin = '0'),
                      (t.style.padding = '0'),
                      (t.style.zIndex = '999999999'),
                      (t.style.pointerEvents = 'none'),
                      document.body.appendChild(t),
                      window.addEventListener('resize', function () {
                        (t.width = 2 * window.innerWidth),
                          (t.height = 2 * window.innerHeight);
                      });
                  }
                }),
                (this.setupElement = function (t) {
                  var n;
                  (r.element = document.getElementById(t)),
                    null === (n = r.element) ||
                      void 0 === n ||
                      n.addEventListener('mouseover', function (t) {
                        var n = new o(2 * t.clientX, 2 * t.clientY);
                        r.bursts.push(new i(n)),
                          e.CONFIG.destroy_target &&
                            (r.element.style.visibility = 'hidden');
                      });
                }),
                (this.update = function (t) {
                  (r.delta_time = (t - r.time) / 1e3), (r.time = t);
                  for (var e = r.bursts.length - 1; e >= 0; e--)
                    r.bursts[e].update(r.delta_time),
                      0 == r.bursts[e].particles.length &&
                        r.bursts.splice(e, 1);
                  r.draw(), window.requestAnimationFrame(r.update);
                }),
                !n)
              )
                throw new Error('Missing id');
              e.CONFIG || (e.CONFIG = new t()),
                (this.time = new Date().getTime()),
                (this.delta_time = 0),
                this.setupCanvasContext(),
                this.setupElement(n),
                window.requestAnimationFrame(this.update);
            }
            return (
              (e.prototype.draw = function () {
                s.clearScreen();
                for (var t = 0, e = this.bursts; t < e.length; t++) {
                  e[t].draw();
                }
              }),
              e
            );
          })(),
          i = (function () {
            function t(t) {
              this.particles = [];
              for (var i = 0; i < e.CONFIG.particle_count; i++)
                this.particles.push(new n(t));
            }
            return (
              (t.prototype.update = function (t) {
                for (var e = this.particles.length - 1; e >= 0; e--)
                  this.particles[e].update(t),
                    this.particles[e].checkBounds() &&
                      this.particles.splice(e, 1);
              }),
              (t.prototype.draw = function () {
                for (var t = this.particles.length - 1; t >= 0; t--)
                  this.particles[t].draw();
              }),
              t
            );
          })(),
          n = (function () {
            function t(t) {
              (this.size = new o(
                (16 * Math.random() + 4) * e.CONFIG.particle_size,
                (4 * Math.random() + 4) * e.CONFIG.particle_size
              )),
                (this.position = new o(
                  t.x - this.size.x / 2,
                  t.y - this.size.y / 2
                )),
                (this.velocity = r.generateVelocity()),
                (this.rotation = 360 * Math.random()),
                (this.rotation_speed = 10 * (Math.random() - 0.5)),
                (this.hue = 360 * Math.random()),
                (this.opacity = 100),
                (this.lifetime = Math.random() + 0.25);
            }
            return (
              (t.prototype.update = function (t) {
                (this.velocity.y +=
                  e.CONFIG.gravity *
                  (this.size.y / (10 * e.CONFIG.particle_size)) *
                  t),
                  (this.velocity.x += 25 * (Math.random() - 0.5) * t),
                  (this.velocity.y *= 0.98),
                  (this.velocity.x *= 0.98),
                  (this.position.x += this.velocity.x),
                  (this.position.y += this.velocity.y),
                  (this.rotation += this.rotation_speed),
                  e.CONFIG.fade && (this.opacity -= this.lifetime);
              }),
              (t.prototype.checkBounds = function () {
                return (
                  this.position.y - 2 * this.size.x > 2 * window.innerHeight
                );
              }),
              (t.prototype.draw = function () {
                s.drawRectangle(
                  this.position,
                  this.size,
                  this.rotation,
                  this.hue,
                  this.opacity
                );
              }),
              t
            );
          })(),
          o = (function () {
            return function (t, e) {
              (this.x = t || 0), (this.y = e || 0);
            };
          })(),
          r = (function () {
            function t() {}
            return (
              (t.generateVelocity = function () {
                var t = Math.random() - 0.5,
                  i = Math.random() - 0.7,
                  n = Math.sqrt(t * t + i * i);
                return (
                  (i /= n),
                  new o(
                    (t /= n) * (Math.random() * e.CONFIG.explosion_power),
                    i * (Math.random() * e.CONFIG.explosion_power)
                  )
                );
              }),
              t
            );
          })(),
          s = (function () {
            function t() {}
            return (
              (t.clearScreen = function () {
                e.CTX &&
                  e.CTX.clearRect(
                    0,
                    0,
                    2 * window.innerWidth,
                    2 * window.innerHeight
                  );
              }),
              (t.drawRectangle = function (t, i, n, o, r) {
                e.CTX &&
                  (e.CTX.save(),
                  e.CTX.beginPath(),
                  e.CTX.translate(t.x + i.x / 2, t.y + i.y / 2),
                  e.CTX.rotate((n * Math.PI) / 180),
                  e.CTX.rect(-i.x / 2, -i.y / 2, i.x, i.y),
                  (e.CTX.fillStyle =
                    'hsla(' + o + 'deg, 90%, 65%, ' + r + '%)'),
                  e.CTX.fill(),
                  e.CTX.restore());
              }),
              t
            );
          })();
        return e;
      })();
      // Pass in the id of an element
     let confetti = new Confetti('diceOut');
      
      // Edit given parameters
      confetti.setCount(100);
      confetti.setSize(2);
      confetti.setPower(100);
      confetti.setFade(false);
      confetti.destroyTarget(true);

      document.querySelector(`.name--${activePlayer}`).textContent +=
        ' wins 🏆';
    } else {
      swich();
    }
  }
});

btnNew.addEventListener('click', function () {
  stopConfetti();
  init();
});
