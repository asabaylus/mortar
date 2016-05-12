import {Pestle, Module} from '../../../../app/scripts/pestle/main'

describe('Pestle', () => {
    it('should be a class', () => {
        expect(Pestle).to.be.a('function');
    });

    describe('Pestle instance', () => {
        var pestle;

        before(() => {
            pestle = new Pestle();
        });

        describe('structure', () => {
            it('should have init method', () => {
                expect(pestle.init).to.be.a('function');
            });

            it('should have Module property', () => {
                expect(pestle.Module).to.be.a('function');
            });
        });
    });

    describe('Module', () => {
        describe('static', () => {
            it('should have module class', () => {
                expect(Module).to.be.a('function');
            });

            it('should have a static method "add"', () => {
                expect(Module.add).to.be.a('function');
            });

            it('should throw error when add if it is not a Module instance', () => {
                // create a new object different to Module
                var module = new Object();
                expect(() => Module.add('Module1', module)).to.throw(Error);
            });

            it('should add the module to the list', () => {
                var module = new Module();
                Module.add("Module1", module);
                expect(Module.list["Module1"]).to.exist;
                expect(Module.list["Module1"]).to.equal(module);
            });

            it("should throw error if a module is using same name", () => {
                var module = new Module();
                expect(() => Module.add('Module1', module)).to.throw(Error);
            });

            it('should list all registered components', () => {
                var module = new Module();
                Module.add("Module2", module);
                var modules = Module.getAll();
                expect(modules).to.have.keys('Module1', 'Module2');
            });
        });

        describe('inherit', () => {
            var Module1, Module2;

            before(() => {
                Module1 = class extends Module {}

                Module2 = class extends Module {
                    init() {}
                }
            });

            it('should have an isLoaded property equals to false', () => {
                var module1 = new Module1();
                expect(module1.isLoaded).to.be.false;
            });

            it('should throw an error if init method is not defined', () => {
                var module1 = new Module1();
                expect(() => module1.init()).to.throw(Error);
            });

            it('should not throw an error if init method is defined', () => {
                var module2 = new Module2();
                expect(() => module2.init()).to.not.throw(Error);
            });

        });
    });
});