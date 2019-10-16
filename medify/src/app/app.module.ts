import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselLandingComponent } from './carousel-landing/carousel-landing.component';
import { Section1LandingComponent } from './section1-landing/section1-landing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { Section2LandingComponent } from './section2-landing/section2-landing.component';
import { Section3LandingComponent } from './section3-landing/section3-landing.component';
import { Section4LandingComponent } from './section4-landing/section4-landing.component';
import { Section5LandingComponent } from './section5-landing/section5-landing.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    CarouselLandingComponent,
    Section1LandingComponent,
    LandingPageComponent,
    Section2LandingComponent,
    Section3LandingComponent,
    Section4LandingComponent,
    Section5LandingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
