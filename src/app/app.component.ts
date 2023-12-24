import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorkComponent } from './work/work.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
            RouterOutlet, 
            EducationComponent,
            MainComponent,
            ProjectsComponent,
            WorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private viewportScroller: ViewportScroller,
              private route: ActivatedRoute, private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  updateFragment(): void {
    let scrollPosition: number = window.scrollY
    let fragment: string = ''

    if (scrollPosition >= 2117) fragment = 'education'
    else if (scrollPosition >= 1414) fragment = 'work-experience'
    else if (scrollPosition >= 711) fragment = 'projects'

    this.router.navigate([], { fragment: fragment, replaceUrl: true })

  }

  ngAfterViewInit(): void {
    this.route.fragment.pipe().subscribe(fragment => {
      if (fragment) {
        // If a click on the main page is clicked on, scroll to the targeted section
        // 'bypassing' the updateFragment() method
        if (this.router.getCurrentNavigation()?.extras?.state!['bypass'])
          this.viewportScroller.scrollToAnchor(fragment)
      }
    });
  }

}
