import { App, PluginSettingTab, Setting } from 'obsidian';
import RAGPlugin from './main';

export class RAGSettingsTab extends PluginSettingTab {
    plugin: RAGPlugin;

    constructor(app: App, plugin: RAGPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'RAG Assistant Settings' });

        new Setting(containerEl)
            .setName('Companion URL')
            .setDesc('URL of the companion app (default: http://localhost:8000)')
            .addText(text => text
                .setPlaceholder('Enter URL')
                .setValue(this.plugin.settings.companionUrl)
                .onChange(async (value) => {
                    this.plugin.settings.companionUrl = value;
                    await this.plugin.saveSettings();
                }));
    }
}